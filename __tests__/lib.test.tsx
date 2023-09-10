import { daysAgo } from '../src/app/lib';

test('daysAgo pluralizes and accounts for days and weeks', () => {
  const oneHour = 3600000;
  const oneDay = oneHour * 24;
  expect(daysAgo(Date.now())).toBe('Today');
  expect(daysAgo(Date.now() - oneDay)).toBe('1 day');
  expect(daysAgo(Date.now() - oneDay * 2)).toBe('2 days');
  expect(daysAgo(Date.now() - oneDay * 3)).toBe('3 days');
  expect(daysAgo(Date.now() - oneDay * 4)).toBe('4 days');
  expect(daysAgo(Date.now() - oneDay * 5)).toBe('5 days');
  expect(daysAgo(Date.now() - oneDay * 6)).toBe('6 days');
  expect(daysAgo(Date.now() - oneDay * 7)).toBe('1 week');
  expect(daysAgo(Date.now() - oneDay * 14)).toBe('2 weeks');
});
