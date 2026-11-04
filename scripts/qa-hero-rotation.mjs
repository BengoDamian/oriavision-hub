import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../site/experience.js', import.meta.url), 'utf8');

// Exercise the production script with a deterministic clock. No browser, real
// delays or duplicated carousel implementation is needed to reproduce stalls.
function setup({ reducedMotion = false, observer = true, eye = false } = {}) {
  const events = target => {
    const listeners = new Map();
    return Object.assign(target, {
      addEventListener(type, callback) {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(callback);
      },
      fire(type, event = {}) { for (const listener of listeners.get(type) || []) listener(event); },
    });
  };
  const slides = Array.from({ length: 3 }, (_, index) => {
    const classes = new Set(index === 0 ? ['is-active'] : []);
    const attributes = new Map([['aria-hidden', String(index !== 0)]]);
    return {
      inert: index !== 0,
      classList: { toggle(name, active) { if (active) classes.add(name); else classes.delete(name); }, contains: name => classes.has(name) },
      setAttribute: (name, value) => attributes.set(name, value),
      getAttribute: name => attributes.get(name),
    };
  });
  let bounds = { top: 80, bottom: 700 };
  let now = 0, nextId = 0;
  const timers = new Map();
  const hero = events({
    dataset: { active: '0' },
    querySelector: selector => selector === '.oria-eye' && eye ? {} : null,
    querySelectorAll: () => slides,
    getBoundingClientRect: () => bounds,
    contains: element => element === cta,
  });
  const cta = {};
  const document = events({ hidden: false, activeElement: null, querySelector: selector => selector === '.signal-hero' ? hero : null, querySelectorAll: () => [] });
  const window = events({ innerHeight: 900 });
  const motion = events({ matches: reducedMotion });
  let intersection;
  class IntersectionObserver {
    constructor(callback) { intersection = callback; }
    observe() {}
  }
  if (observer) window.IntersectionObserver = IntersectionObserver;
  vm.runInNewContext(source, {
    document, window, matchMedia: () => motion, IntersectionObserver,
    performance: { now: () => now },
    setTimeout(callback, delay = 0) { const id = ++nextId; timers.set(id, { callback, at: now + delay }); return id; },
    clearTimeout: id => timers.delete(id),
  });
  return {
    hero, document, window, motion, cta,
    pending: () => timers.size,
    tick(duration) {
      const end = now + duration;
      let turns = 0;
      while (true) {
        const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        assert(++turns < 100, 'Timer loop');
        timers.delete(next[0]);
        now = next[1].at;
        next[1].callback();
      }
      now = end;
    },
    visible(value) {
      bounds = value ? { top: 80, bottom: 700 } : { top: -700, bottom: -10 };
      intersection?.([{ isIntersecting: value, intersectionRatio: value ? 1 : 0 }]);
    },
    active(index) {
      assert.equal(hero.dataset.active, String(index));
      slides.forEach((slide, i) => {
        assert.equal(slide.classList.contains('is-active'), i === index);
        assert.equal(slide.inert, i !== index);
        assert.equal(slide.getAttribute('aria-hidden'), String(i !== index));
      });
    },
  };
}

test('rotation continues while the mouse or CTA focus stays inside the hero', () => {
  const page = setup();
  page.hero.fire('pointerenter', { pointerType: 'mouse' });
  page.document.activeElement = page.cta;
  page.hero.fire('focusin');
  page.tick(2000);
  page.active(1);
  page.tick(3000);
  page.active(2);
  page.tick(3000);
  page.active(0);
  assert.equal(page.pending(), 1);
});

test('mouse movement and repeated visibility notifications do not reset the clock', () => {
  const page = setup();
  for (let i = 0; i < 4; i++) {
    page.tick(400);
    page.visible(true);
    page.hero.fire('pointerenter', { pointerType: 'mouse' });
    page.hero.fire('pointerleave', { pointerType: 'mouse' });
    page.document.fire('visibilitychange');
  }
  page.tick(400);
  page.active(1);
  assert.equal(page.pending(), 1);
});

test('scrolling away pauses and scrolling back resumes the remaining time', () => {
  const page = setup();
  page.tick(750);
  page.visible(false);
  assert.equal(page.pending(), 0);
  page.tick(10000);
  page.active(0);
  page.visible(true);
  page.tick(1249);
  page.active(0);
  page.tick(1);
  page.active(1);
});

test('changing tabs resumes automatically without mouse input or timer duplication', () => {
  const page = setup();
  page.tick(2000);
  page.tick(1000);
  page.document.hidden = true;
  page.document.fire('visibilitychange');
  page.tick(15000);
  page.active(1);
  page.document.hidden = false;
  page.document.fire('visibilitychange');
  page.document.fire('visibilitychange');
  page.tick(1999);
  page.active(1);
  page.tick(1);
  page.active(2);
  assert.equal(page.pending(), 1);
});

test('restoring a page from browser history restarts its suspended timer', () => {
  const page = setup();
  page.tick(2000);
  page.tick(1000);
  page.window.fire('pagehide', { persisted: true });
  assert.equal(page.pending(), 0);
  page.tick(30000);
  page.window.fire('pageshow', { persisted: true });
  page.window.fire('pageshow', { persisted: true });
  page.tick(2000);
  page.active(2);
  assert.equal(page.pending(), 1);
});

test('reduced-motion preference pauses rotation and changing it resumes safely', () => {
  const page = setup({ reducedMotion: true });
  page.tick(10000);
  page.active(0);
  assert.equal(page.pending(), 0);
  page.motion.matches = false;
  page.motion.fire('change');
  page.tick(2000);
  page.active(1);
  page.motion.matches = true;
  page.motion.fire('change');
  page.tick(10000);
  page.active(1);
  assert.equal(page.pending(), 0);
});

test('rotation also starts when IntersectionObserver is unavailable', () => {
  const page = setup({ observer: false });
  page.tick(5000);
  page.active(2);
  assert.equal(page.pending(), 1);
});

test('the eyelid finishes closing and holds before changing the platform', () => {
  const page = setup({ eye: true });
  page.tick(2000);
  page.active(0);
  assert.equal(page.hero.dataset.blink, 'closing');
  page.tick(180);
  page.active(0);
  assert.equal(page.hero.dataset.blink, 'closing');
  page.tick(39);
  page.active(0);
  page.tick(1);
  page.active(1);
  assert.equal(page.hero.dataset.blink, 'opening');
  page.tick(240);
  assert.equal(page.hero.dataset.blink, 'idle');
  page.tick(2760);
  page.active(2);
  assert.equal(page.hero.dataset.blink, 'opening');
  page.tick(3000);
  page.active(0);
  assert.equal(page.pending(), 1);
});

test('scrolling away mid-blink and returning completes the same blink once', () => {
  const page = setup({ eye: true });
  page.tick(2070);
  page.visible(false);
  assert.equal(page.pending(), 0);
  page.tick(10000);
  page.active(0);
  page.visible(true);
  page.tick(149);
  page.active(0);
  page.tick(1);
  page.active(1);
  page.tick(240);
  assert.equal(page.hero.dataset.blink, 'idle');
  assert.equal(page.pending(), 1);
});

test('reduced motion during a blink leaves the eye open without advancing platforms', () => {
  const page = setup({ eye: true });
  page.tick(2000);
  page.motion.matches = true;
  page.motion.fire('change');
  assert.equal(page.hero.dataset.blink, 'idle');
  assert.equal(page.pending(), 0);
  page.tick(10000);
  page.active(0);
  page.motion.matches = false;
  page.motion.fire('change');
  page.tick(3220);
  page.active(1);
  assert.equal(page.hero.dataset.blink, 'opening');
});

test('the eye stays on the first platform when reduced motion is initially enabled', () => {
  const page = setup({ eye: true, reducedMotion: true });
  page.tick(10000);
  page.active(0);
  assert.notEqual(page.hero.dataset.blink, 'closing');
  assert.equal(page.pending(), 0);
});

test('a page restored mid-blink resumes without leaving the eye closed', () => {
  const page = setup({ eye: true });
  page.tick(2050);
  page.window.fire('pagehide', { persisted: true });
  page.tick(10000);
  page.window.fire('pageshow', { persisted: true });
  page.window.fire('pageshow', { persisted: true });
  page.tick(170);
  page.active(1);
  page.tick(240);
  assert.equal(page.hero.dataset.blink, 'idle');
  assert.equal(page.pending(), 1);
});
