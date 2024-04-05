import { test, expect } from 'vitest';
import { sum } from './sum.ts';

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 3)).toBe(5);
});
