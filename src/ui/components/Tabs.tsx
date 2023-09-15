import Tab from './Tab';
import List from './List';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import { SavedTab } from '../../types/types';
import useFuzzy from '../../app/hooks/useFuzzy';
import { fuzzy } from '../../app/lib';

type TabsProps = {
  savedTabs: SavedTab[];
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTab[]>>;
};

export default function Tabs({ savedTabs, setSavedTabs }: TabsProps) {
  const [searchValue, setSearchValue] = useState('');
  const [pinIsChecked, setPinIsChecked] = useState(false);
  // TODO: maybe refactor this to be readable??? need this to have pinned tabs first with search
  const tabs = pinIsChecked
    ? [
        ...fuzzy(
          savedTabs.filter((tab) => tab.isPinned),
          searchValue,
          ['url']
        ),
        ...fuzzy(
          savedTabs.filter((tab) => !tab.isPinned),
          searchValue,
          ['url']
        )
      ]
    : fuzzy(savedTabs, searchValue, ['url']);

  const Tag = pinIsChecked ? DrawingPinFilledIcon : DrawingPinIcon;

  const onSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 12px 12px 12px',
        width: '100%'
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
        <Tag
          onClick={() => setPinIsChecked(!pinIsChecked)}
          height={25}
          width={25}
          color="limegreen"
        />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChange={onSearchChange}
        />
      </div>
      <List>
        {tabs?.map(({ url, isPinned, savedAt, id }) => {
          return (
            <Tab
              savedTabs={savedTabs}
              setSavedTabs={setSavedTabs}
              url={url}
              isPinned={isPinned}
              savedAt={savedAt}
              key={id}
              id={id}
            />
          );
        })}
      </List>
    </section>
  );
}
