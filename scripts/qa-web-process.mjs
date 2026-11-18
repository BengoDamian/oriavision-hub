import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { load } from 'cheerio';

const source = readFileSync(new URL('../site/web-process.js', import.meta.url), 'utf8');
const markup = readFileSync(new URL('../site/servicios/diseno-web/index.html', import.meta.url), 'utf8');
const phases = ['idea', 'wire', 'design', 'online'];
const durations = [5200, 5200, 5600, 5400];

function setup({ reduced = false, observer = true } = {}) {
  const $ = load(markup), wrappers = new WeakMap(), timers = new Map();
  let clock = 0, timerId = 0, intersection;
  function events(target) {
    const listeners = new Map();
    return Object.assign(target, {
      addEventListener(type, fn) { listeners.set(type, [...(listeners.get(type) || []), fn]); },
      fire(type, event = {}) { for (const fn of listeners.get(type) || []) fn(event); },
    });
  }
  function wrap(node) {
    if (!node) return null;
    if (wrappers.has(node)) return wrappers.get(node);
    const element = events({
      dataset: Object.fromEntries(Object.entries(node.attribs).filter(([key]) => key.startsWith('data-')).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()), value])),
      style: { setProperty() {} },
      querySelector: selector => wrap($(node).find(selector)[0]),
      querySelectorAll: selector => $(node).find(selector).toArray().map(wrap),
      setAttribute: (key, value) => $(node).attr(key, value),
      getAttribute: key => $(node).attr(key),
      classList: {
        toggle(key, active) { if (active) $(node).addClass(key); else $(node).removeClass(key); },
        add: key => $(node).addClass(key),
      },
      get textContent() { return $(node).text(); },
      set textContent(value) { $(node).text(value); },
      getAnimations: () => [],
      focus() { document.activeElement = element; },
    });
    wrappers.set(node, element);
    return element;
  }
  const document = events({ hidden: false, activeElement: null, querySelector: selector => wrap($(selector)[0]) });
  const window = events({});
  const motion = events({ matches: reduced });
  class IntersectionObserver {
    constructor(callback) { intersection = callback; }
    observe() {}
  }
  if (observer) window.IntersectionObserver = IntersectionObserver;
  vm.runInNewContext(source, {
    document, window, IntersectionObserver, matchMedia: () => motion,
    performance: { now: () => clock },
    setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, at: clock + delay }); return id; },
    clearTimeout: id => timers.delete(id),
  });
  const player = document.querySelector('[data-process-player]');
  return {
    player, document, window, motion,
    steps: player.querySelectorAll('[data-process-step]'),
    descriptions: player.querySelectorAll('[data-process-description]'),
    playback: player.querySelector('[data-process-playback]'),
    pending: () => timers.size,
    visibility(visible) { intersection([{ isIntersecting: visible, intersectionRatio: visible ? 1 : 0 }]); },
    tick(duration) {
      const end = clock + duration;
      let iterations = 0;
      while (true) {
        const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        assert(++iterations < 100, 'Unexpected timer loop');
        timers.delete(next[0]); clock = next[1].at; next[1].fn();
      }
      clock = end;
    },
  };
}

test('the sequence starts in view and advances through all four stages with matching accessible content', () => {
  const s = setup();
  assert.equal(s.pending(), 0);
  s.visibility(true);
  phases.forEach((phase, i) => {
    assert.equal(s.player.dataset.phase, phase);
    assert.equal(s.steps[i].getAttribute('aria-pressed'), 'true');
    assert.equal(s.descriptions[i].inert, false);
    assert.equal(s.descriptions.filter(p => p.getAttribute('aria-hidden') === 'false').length, 1);
    assert.equal(s.pending(), 1);
    s.tick(durations[i]);
  });
  assert.equal(s.player.dataset.phase, 'idea');
});

test('manual selection stops rotation and exposes a complete static stage until playback is requested', () => {
  const s = setup({ observer: false });
  s.steps[2].fire('click');
  assert.equal(s.player.dataset.phase, 'design');
  assert.equal(s.player.dataset.manual, 'true');
  assert.equal(s.pending(), 0);
  s.tick(30000);
  assert.equal(s.player.dataset.phase, 'design');
  assert.match(s.player.querySelector('[data-process-announcement]').textContent, /Paso 3 de 4/);
  s.playback.fire('click');
  assert.equal(s.player.dataset.manual, 'false');
  assert.equal(s.pending(), 1);
  s.tick(5600);
  assert.equal(s.player.dataset.phase, 'online');
});

test('pause, offscreen suspension and tab visibility retain time without duplicate timers', () => {
  const s = setup();
  s.visibility(true); s.tick(1200);
  s.playback.fire('click'); s.tick(20000);
  assert.equal(s.pending(), 0);
  s.playback.fire('click');
  s.visibility(true); s.visibility(true);
  assert.equal(s.pending(), 1);
  s.tick(1500); s.visibility(false); s.tick(20000); s.visibility(true);
  s.document.hidden = true; s.document.fire('visibilitychange'); s.tick(20000);
  s.document.hidden = false; s.document.fire('visibilitychange');
  s.tick(2499); assert.equal(s.player.dataset.phase, 'idea');
  s.tick(1); assert.equal(s.player.dataset.phase, 'wire');
});

test('keyboard navigation wraps, supports Home/End and pauses on focus', () => {
  const s = setup({ observer: false });
  s.player.querySelector('.process-timeline').fire('focusin');
  assert.equal(s.pending(), 0);
  s.steps[0].fire('keydown', { key: 'ArrowLeft', preventDefault() {} });
  assert.equal(s.player.dataset.phase, 'online');
  assert.equal(s.document.activeElement, s.steps[3]);
  s.steps[3].fire('keydown', { key: 'Home', preventDefault() {} });
  assert.equal(s.player.dataset.phase, 'idea');
  s.steps[0].fire('keydown', { key: 'End', preventDefault() {} });
  assert.equal(s.player.dataset.phase, 'online');
});

test('reduced motion starts with the completed illustration and no automatic playback', () => {
  const s = setup({ reduced: true });
  s.visibility(true);
  assert.equal(s.player.dataset.phase, 'online');
  assert.equal(s.player.dataset.manual, 'true');
  assert.equal(s.pending(), 0);
  s.steps[1].fire('click');
  assert.equal(s.player.dataset.phase, 'wire');
  s.motion.matches = false; s.motion.fire('change');
  assert.equal(s.pending(), 0);
});

test('returning from page history resumes the remaining interval', () => {
  const s = setup({ observer: false });
  s.tick(1000); s.window.fire('pagehide'); s.tick(15000);
  assert.equal(s.pending(), 0);
  s.window.fire('pageshow'); s.tick(4200);
  assert.equal(s.player.dataset.phase, 'wire');
});
