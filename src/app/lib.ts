import Fuse from 'fuse.js';
import { SavedTab } from '../types/types';

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

// TODO: include optional stuff later on maybe??

// type Fuzzy = {
//   list: SavedTab[];
//   value: string;
//   keys: string[];
//   includeScore?: boolean;
//   shouldSort?: boolean;
//   includeMatches?: boolean;
//   findAllMatches?: boolean;
//   minMatchCharLength?: number;
//   location?: number;
//   threshold?: number;
//   distance?: number;
//   useExtendedSearch?: boolean;
//   ignoreLocation?: boolean;
//   ignoreFieldNorm?: boolean;
//   fieldNormWeight?: number;
// };

export function fuzzy(list: SavedTab[], value: string, keys: string[]) {
  if (value.length < 1) return list;
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys
  };

  const fuse = new Fuse(list, fuseOptions);
  const search = fuse.search(value);
  return search.map(({ item }) => item);
}
