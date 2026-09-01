import '@testing-library/jest-dom';

// Complete robust localStorage mock for Node 26+ / jsdom
const storageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index) => Object.keys(store)[index] || null,
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: storageMock,
  writable: true,
  configurable: true,
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: storageMock,
    writable: true,
    configurable: true,
  });

  window.HTMLElement.prototype.scrollIntoView = () => {};
  window.scrollTo = () => {};

  window.speechSynthesis = {
    speak: () => {},
    cancel: () => {},
    pause: () => {},
    resume: () => {},
    getVoices: () => []
  };
}
