import { validate } from './validator';
import {
  mockNumber,
  mockRange,
  mockSchema,
} from './mocker';

test('minute must be between 0-59', () => {
  expect(validate(mockSchema({ minute: mockNumber(0) }))).toBe(null);
  expect(validate(mockSchema({ minute: mockNumber(15) }))).toBe(null);
  expect(validate(mockSchema({ minute: mockNumber(59) }))).toBe(null);
  expect(typeof validate(mockSchema({ minute: mockNumber(-1) }))).toBe('string');
  expect(typeof validate(mockSchema({ minute: mockNumber(60) }))).toBe('string');
});

test('hour must be between 0-23', () => {
  expect(validate(mockSchema({ hour: mockNumber(0) }))).toBe(null);
  expect(validate(mockSchema({ hour: mockNumber(15) }))).toBe(null);
  expect(validate(mockSchema({ hour: mockNumber(23) }))).toBe(null);
  expect(typeof validate(mockSchema({ hour: mockNumber(-1) }))).toBe('string');
  expect(typeof validate(mockSchema({ hour: mockNumber(24) }))).toBe('string');
});

test('date must be between 1-31', () => {
  expect(validate(mockSchema({ date: mockNumber(1) }))).toBe(null);
  expect(validate(mockSchema({ date: mockNumber(15) }))).toBe(null);
  expect(validate(mockSchema({ date: mockNumber(31) }))).toBe(null);
  expect(typeof validate(mockSchema({ date: mockNumber(0) }))).toBe('string');
  expect(typeof validate(mockSchema({ date: mockNumber(32) }))).toBe('string');
});

test('month must be between 1-12', () => {
  expect(validate(mockSchema({ month: mockNumber(1) }))).toBe(null);
  expect(validate(mockSchema({ month: mockNumber(10) }))).toBe(null);
  expect(validate(mockSchema({ month: mockNumber(12) }))).toBe(null);
  expect(typeof validate(mockSchema({ month: mockNumber(0) }))).toBe('string');
  expect(typeof validate(mockSchema({ month: mockNumber(13) }))).toBe('string');
});

test('day must be between 0-7', () => {
  expect(validate(mockSchema({ day: mockNumber(0) }))).toBe(null);
  expect(validate(mockSchema({ day: mockNumber(5) }))).toBe(null);
  expect(validate(mockSchema({ day: mockNumber(7) }))).toBe(null);
  expect(typeof validate(mockSchema({ day: mockNumber(-1) }))).toBe('string');
  expect(typeof validate(mockSchema({ day: mockNumber(8) }))).toBe('string');
});

test('minute range should be lower to higher', () => {
  expect(validate(mockSchema({ minute: mockRange(1, 2) }))).toBe(null);
  expect(typeof validate(mockSchema({ minute: mockRange(2, 1) }))).toBe('string');
});

test('hour range should be lower to higher', () => {
  expect(validate(mockSchema({ hour: mockRange(1, 2) }))).toBe(null);
  expect(typeof validate(mockSchema({ hour: mockRange(2, 1) }))).toBe('string');
});

test('date range should be lower to higher', () => {
  expect(validate(mockSchema({ date: mockRange(1, 2) }))).toBe(null);
  expect(typeof validate(mockSchema({ date: mockRange(2, 1) }))).toBe('string');
});

test('month range should be lower to higher', () => {
  expect(validate(mockSchema({ month: mockRange(1, 2) }))).toBe(null);
  expect(typeof validate(mockSchema({ month: mockRange(2, 1) }))).toBe('string');
});

test('day range should be lower to higher', () => {
  expect(validate(mockSchema({ day: mockRange(1, 2) }))).toBe(null);
  expect(typeof validate(mockSchema({ day: mockRange(2, 1) }))).toBe('string');
});