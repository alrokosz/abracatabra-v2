import leven from 'leven';
import Fuse from 'fuse.js';

export function levenshtein(str1: string, str2: string, n: number): boolean {
  return leven(str1, str2) > n;
}

export function daysAgo(time: number) {
  const singleHour = 3600000;
  const differenceInMs = Date.now() - time;
  const hoursSavedAgo = differenceInMs / singleHour;

  if (hoursSavedAgo < 24) {
    return 'Today';
  }

  const days = Math.floor(hoursSavedAgo / 24);
  if (hoursSavedAgo < 168) {
    return `${days} day${days > 1 ? 's' : ''}`;
  }

  // 168 hours in a week
  const weeks = Math.floor(hoursSavedAgo / 168);
  if (hoursSavedAgo > 168) {
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }
}
