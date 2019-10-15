import { isAny } from './utils';
import { mockType, mockGroup } from './mocker';

test("[{type: 'any'}] should be true", function() {
  expect(isAny(mockGroup([{type: 'any'}]))).toBe(true);
});

test("[{type: 'number'}] should be false", function() {
  expect(isAny(mockGroup([{type: 'number'}]))).toBe(false);
});

test("[{type: 'range'}] should be false", function() {
  expect(isAny(mockGroup([{type: 'range'}]))).toBe(false);
});

test("[{type: 'months'}] should be false", function() {
  expect(isAny(mockGroup([{type: 'months'}]))).toBe(false);
});

test("[{type: 'days'}] should be false", function() {
  expect(isAny(mockGroup([{type: 'days'}]))).toBe(false);
});