import leven from 'leven';

export function levenshtein(str1: string, str2: string, n: number): boolean {
  return leven(str1, str2) > n;
}
