import { daysAgo } from '../src/app/lib';

test('days ago works', () => {
  expect(daysAgo(Date.now())).toBe('Today');
});
