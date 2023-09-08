import Tab from './Tab';
import { levenshtein } from '../../app/lib';
import List from './List';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';

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
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 12px 12px 12px'
      }}
    >
      <h1 style={{ alignSelf: 'center' }}>Saved Tabs</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <DrawingPinIcon height={25} width={25} />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChange={onSearchChange}
        />
      </div>
      <List>
        {savedTabs?.map(({ savedAt, url, isPinned, id }) => (
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
