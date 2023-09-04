import Tab from './Tab';
import { levenshtein } from '../../app/lib';
import List from './List';
import SearchBar from './SearchBar';
import { useState } from 'react';

type TabsProps = {
  savedTabs: SavedTab[];
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTab[]>>;
};

export default function Tabs({ savedTabs, setSavedTabs }: TabsProps) {
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Saved Tabs</h1>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChange={onSearchChange}
      />
      <List>
        {savedTabs.map(({ savedAt, url, isPinned, id }) => (
          <Tab
            setSavedTabs={setSavedTabs}
            url={url}
            isPinned={isPinned}
            savedAt={savedAt}
            key={id}
            id={id}
          />
        ))}
      </List>
    </section>
  );
}
