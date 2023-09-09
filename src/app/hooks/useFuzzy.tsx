import Fuse from 'fuse.js';
import { SavedTab } from '../../types/types';
import { useMemo } from 'react';

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

export default function useFuzzy(
  list: SavedTab[],
  value: string,
  keys: string[]
) {
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
