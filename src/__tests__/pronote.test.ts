import { describe, it, expect } from 'vitest';

describe('Pronote Cards', () => {
  it('should have window object available', () => {
    expect(typeof window).toBe('object');
  });

  it('should have customElements API', () => {
    expect(typeof window.customElements).toBe('object');
    expect(typeof window.customElements.define).toBe('function');
  });

  it('should expose console object', () => {
    expect(typeof console).toBe('object');
    expect(typeof console.log).toBe('function');
  });
});
