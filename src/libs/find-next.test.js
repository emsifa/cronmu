import {
  matchStep,
  matchNumber,
  matchRange,
  getCommonTypeMatches,
  getMatchMonths,
  getMatchDays,
  findNext
} from './find-next';

import {
  mockAny,
  mockNumber,
  mockRange,
  mockGroup,
  mockType,
  mockSchema,
} from './mocker';

test("matchStep", () => {
  expect(matchStep(1, 3, 2)).toBe(false);
  expect(matchStep(5, 5, 2)).toBe(true);
  expect(matchStep(7, 5, 2)).toBe(true);
  expect(matchStep(6, 5, 2)).toBe(false);
  expect(matchStep(8, 5, 2)).toBe(false);
});

test("matchNumber", () => {
  expect(matchNumber(mockNumber(1), 1)).toBe(true);
  expect(matchNumber(mockNumber(1), 2)).toBe(false);
  expect(matchNumber(mockNumber(1), 10)).toBe(false);
  expect(matchNumber(mockNumber(1), 21)).toBe(false);
});

test("matchNumber with step", () => {
  expect(matchNumber(mockNumber(3, 2), 1)).toBe(false);
  expect(matchNumber(mockNumber(5, 2), 5)).toBe(true);
  expect(matchNumber(mockNumber(5, 2), 7)).toBe(true);
  expect(matchNumber(mockNumber(5, 2), 4)).toBe(false);
  expect(matchNumber(mockNumber(5, 2), 6)).toBe(false);
});

test("matchRange", () => {
  expect(matchRange(mockRange(6, 10), 5)).toBe(false);
  expect(matchRange(mockRange(6, 10), 6)).toBe(true);
  expect(matchRange(mockRange(6, 10), 10)).toBe(true);
  expect(matchRange(mockRange(6, 10), 11)).toBe(false);
});

test("matchRange with step", () => {
  expect(matchRange(mockRange(5, 10, 2), 4)).toBe(false);
  expect(matchRange(mockRange(5, 10, 2), 11)).toBe(false);
  expect(matchRange(mockRange(5, 10, 2), 5)).toBe(true);
  expect(matchRange(mockRange(5, 10, 2), 6)).toBe(false);
  expect(matchRange(mockRange(5, 10, 2), 7)).toBe(true);
  expect(matchRange(mockRange(5, 10, 2), 8)).toBe(false);
  expect(matchRange(mockRange(5, 10, 2), 9)).toBe(true);
  expect(matchRange(mockRange(5, 10, 2), 10)).toBe(false);
});


test("getCommonTypeMatches", () => {
  expect(getCommonTypeMatches(mockGroup(mockAny()), [1, 5])).toEqual([1, 2, 3, 4, 5]);

  expect(getCommonTypeMatches(mockGroup(mockNumber(3)), [1, 5])).toEqual([3]);
  expect(getCommonTypeMatches(mockGroup(mockNumber(10)), [1, 5])).toEqual([]);
  expect(getCommonTypeMatches(mockGroup(mockNumber(3, 2)), [1, 5])).toEqual([3, 5]);

  expect(getCommonTypeMatches(mockGroup(mockRange(10, 15)), [1, 60])).toEqual([10, 11, 12, 13, 14, 15]);
  expect(getCommonTypeMatches(mockGroup(mockRange(11, 15, 2)), [1, 60])).toEqual([11, 13, 15]);
});

test("getMatchMonths", () => {
  expect(getMatchMonths(mockGroup(mockType('months', ['JAN', 'JUN'])))).toEqual([1, 6]);
  expect(getMatchMonths(mockGroup([
    mockNumber(3),
    mockType('months', ['JAN', 'JUN']),
  ]))).toEqual([3, 1, 6]);
});

test("getMatchDays", () => {
  expect(getMatchDays(mockGroup(mockType('days', ['SUN', 'SAT'])))).toEqual([0, 6]);
  expect(getMatchDays(mockGroup([
    mockNumber(3),
    mockType('days', ['SUN', 'SAT']),
  ]))).toEqual([3, 0, 6]);
});

test("findNext: * * * * *", () => {
  const date = new Date();
  date.setMinutes(0);

  const schema = mockSchema();
  const results = findNext(schema, date, 10);

  expect(results.length).toBe(10);
  for (let i = 0; i < 10; i++) {
    expect(results[i].getMinutes()).toBe(i);
  }
});

test("findNext: 1 * * * *", () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);

  const schema = mockSchema({minute: mockNumber(1)});
  const results = findNext(schema, date, 10);

  expect(results.length).toBe(10);
  for (let i = 0; i < 10; i++) {
    expect(results[i].getMinutes()).toBe(1);
    expect(results[i].getHours()).toBe(i);
  }
});

test("findNext: * 1 * * *", () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);

  const schema = mockSchema({hour: mockNumber(1)});
  const results = findNext(schema, date, 10);

  expect(results.length).toBe(10);
  for (let i = 0; i < 10; i++) {
    expect(results[i].getHours()).toBe(1);
    expect(results[i].getMinutes()).toBe(i);
  }
});

test("findNext: * * 1 * *", () => {
  const date = new Date();
  date.setDate(3);
  date.setHours(0);
  date.setMinutes(0);

  const schema = mockSchema({date: mockNumber(1)});
  const results = findNext(schema, date, 10);

  expect(results.length).toBe(10);
  for (let i = 0; i < 10; i++) {
    expect(results[i].getDate()).toBe(1);
    expect(results[i].getMinutes()).toBe(i);
  }
});

test("findNext: * * * 1 *", () => {
  const date = new Date();
  date.setMonth(0);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);

  const schema = mockSchema({month: mockNumber(1)});
  const results = findNext(schema, date, 10);

  expect(results.length).toBe(10);
  for (let i = 0; i < 10; i++) {
    expect(results[i].getMonth()).toBe(0);
    expect(results[i].getMinutes()).toBe(i);
  }
});