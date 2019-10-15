import { explain } from './explainer';
import {
  mockType,
  mockAny,
  mockNumber,
  mockRange,
  mockSchema,
} from './mocker';

test('* * * * * = "Setiap menit."', () => {
  expect(explain(mockSchema())).toBe("Setiap menit.");
});

test('1 * * * * = "Setiap menit 1."', () => {
  expect(explain(mockSchema({ minute: mockNumber(1) })))
    .toBe("Setiap menit 1.");
});

test('1-5 * * * * = "Setiap menit 1 sampai dengan 5."', () => {
  expect(explain(mockSchema({ minute: mockRange(1, 5) })))
    .toBe("Setiap menit 1 sampai dengan 5.");
});

test('1,2,3 * * * * = "Setiap menit 1, 2, dan 3."', () => {
  expect(explain(mockSchema({ minute: [mockNumber(1), mockNumber(2), mockNumber(3)] })))
  .toBe("Setiap menit 1, 2, dan 3.");
});

test('10/2 * * * * = "Setiap menit kelipatan 2 antara 10 sampai dengan 59."', () => {
  expect(explain(mockSchema({ minute: mockNumber(10, 2) })))
    .toBe("Setiap menit kelipatan 2 antara 10 sampai dengan 59.");
});

test('2-10/2 * * * * = "Setiap menit kelipatan 2 antara 2 sampai dengan 10."', () => {
  expect(explain(mockSchema({ minute: mockRange(2, 10, 2) })))
    .toBe("Setiap menit kelipatan 2 antara 2 sampai dengan 10.");
});

test('2-10/2,15,25 * * * * = "Setiap menit kelipatan 2 antara 2 sampai dengan 10, 15, dan 25."', () => {
  expect(explain(mockSchema({ minute: [mockRange(2, 10, 2), mockNumber(15), mockNumber(25)] })))
    .toBe("Setiap menit kelipatan 2 antara 2 sampai dengan 10, 15, dan 25.");
});

test('* 1 * * * = "Setiap menit. Pada jam 1."', () => {
  expect(explain(mockSchema({ minute: mockAny(), hour: mockNumber(1) })))
    .toBe("Setiap menit. Pada jam 1.");
});

test('* 1-5 * * * = "Setiap menit. Pada jam 1 sampai dengan 5."', () => {
  expect(explain(mockSchema({ minute: mockAny(), hour: mockRange(1, 5) })))
    .toBe("Setiap menit. Pada jam 1 sampai dengan 5.");
});

test('* 1-5 * 1 * = "Setiap menit. Pada jam 1 sampai dengan 5. Pada bulan Januari."', () => {
  expect(explain(mockSchema({ minute: mockAny(), hour: mockRange(1, 5), month: mockNumber(1) })))
    .toBe("Setiap menit. Pada jam 1 sampai dengan 5. Pada bulan Januari.");
});

test('* 1-5 * JAN MON,FRI = "Setiap menit. Pada jam 1 sampai dengan 5. Di hari Senin dan Jum\'at. Pada bulan Januari. "', () => {
  expect(explain(mockSchema({
    minute: mockAny(),
    hour: mockRange(1, 5),
    month: mockType("months", ['JAN'], 'JAN'),
    day: mockType("days", ['MON', 'FRI'], 'MON,FRI'),
  }))).toBe("Setiap menit. Pada jam 1 sampai dengan 5. Di hari Senin dan Jum'at. Pada bulan Januari.");
});