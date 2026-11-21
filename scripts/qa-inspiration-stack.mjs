import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../site/inspiration.js', import.meta.url), 'utf8');

// Run the actual page script with native positions supplied by the fixture.
// Inspect each frame separately: a correct final state can hide a one-frame flash.
function setup() {
  const events = target => {
    const listeners = new Map();
    return Object.assign(target, {
      addEventListener(type, callback) {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(callback);
      },
      fire(type) { for (const callback of listeners.get(type) || []) callback(); },
    });
  };
  const style = () => {
    const values = new Map();
    return {
      setProperty: (key, value) => values.set(key, value),
      getPropertyValue: key => values.get(key) || '',
      removeProperty: key => values.delete(key),
      snapshot: () => Object.fromEntries(values),
    };
  };
  const designs = [0, 1].map(index => {
    const input = events({ dataset: { preview: 'preview.webp', alt: 'Demo', title: 'Demo', url: '/demos/example/', whatsapp: 'https://wa.me/example' } });
    const nodes = new Map([
      ['.inspiration-preview img', {}],
      ['.design-image-link', { setAttribute() {} }],
      ['figcaption', {}], ['.design-link', {}], ['.design-consult', {}], ['input:checked', input],
    ]);
    return {
      id: `design-${index}`, hidden: false, offsetHeight: 850, top: -130, style: style(),
      getBoundingClientRect() { return { top: this.top }; },
      querySelector: selector => nodes.get(selector), querySelectorAll: () => [input],
    };
  });
  const classes = new Set();
  const stack = { style: style(), classList: {
    toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); },
    contains: name => classes.has(name),
  } };
  const select = events({ value: 'all' });
  const motion = events({ matches: false });
  const window = events({ innerWidth: 390, innerHeight: 740, visualViewport: events({}) });
  const header = { getBoundingClientRect: () => ({ height: 68 }) };
  const nodes = new Map([['#inspiration-activity', select], ['#inspiration-count', {}], ['.inspiration-stack', stack], ['.site-header', header]]);
  let resize;
  class ResizeObserver { constructor(callback) { resize = callback; } observe() {} }
  window.ResizeObserver = ResizeObserver;
  let nextId = 0;
  const frames = new Map();
  vm.runInNewContext(source, {
    document: { querySelector: selector => nodes.get(selector), querySelectorAll: () => designs },
    window, matchMedia: () => motion, ResizeObserver,
    requestAnimationFrame(callback) { const id = ++nextId; frames.set(id, callback); return id; },
  });
  const frame = () => {
    const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback());
  };
  for (let i = 0; i < 3; i++) frame();
  return { designs, stack, select, motion, window, frame, resize: () => resize(), pending: () => frames.size };
}

function assertAligned(page) {
  for (const sheet of page.designs.filter(sheet => !sheet.hidden)) {
    const rim = parseFloat(sheet.style.getPropertyValue('--inspiration-sheet-top'));
    const clip = parseFloat(sheet.style.getPropertyValue('--inspiration-clip-top')) || 0;
    assert.equal(sheet.top + clip, Math.max(sheet.top, rim));
  }
}

test('fast scroll reversals keep the clipping aligned without waiting another frame', () => {
  const page = setup();
  for (const top of [-200, -80, -250, 20, 150, -30]) {
    page.designs.forEach(sheet => sheet.top = top);
    page.window.fire('scroll');
    assertAligned(page);
    assert.equal(page.pending(), 0);
  }
});

test('a layout update never exposes an unclipped tall sheet for one frame', () => {
  const page = setup();
  page.resize();
  page.frame();
  assertAligned(page);
  assert.equal(page.pending(), 0);
});

test('toolbar height and visual viewport changes do not reset the sticky geometry', () => {
  const page = setup();
  const before = page.designs.map(sheet => sheet.style.snapshot());
  for (const height of [680, 710, 740, 660, 740]) {
    page.window.innerHeight = height;
    page.window.visualViewport.fire('resize');
    page.window.fire('resize');
    page.frame();
    assert.deepEqual(page.designs.map(sheet => sheet.style.snapshot()), before);
    assertAligned(page);
  }
});

test('filtering and reduced motion still disable and restore the stack cleanly', () => {
  const page = setup();
  page.select.value = 'design-0'; page.select.fire('change'); page.frame();
  assert.equal(page.stack.classList.contains('is-stacked'), false);
  assert.equal(page.designs[0].style.getPropertyValue('--inspiration-clip-top'), '');
  page.select.value = 'all'; page.select.fire('change'); page.frame();
  assert.equal(page.stack.classList.contains('is-stacked'), true);
  assertAligned(page);
  page.motion.matches = true; page.motion.fire('change'); page.frame();
  assert.equal(page.stack.classList.contains('is-stacked'), false);
  page.designs.forEach(sheet => assert.equal(sheet.style.getPropertyValue('--inspiration-clip-top'), ''));
  page.motion.matches = false; page.motion.fire('change'); page.frame();
  assert.equal(page.stack.classList.contains('is-stacked'), true);
  assertAligned(page);
});
