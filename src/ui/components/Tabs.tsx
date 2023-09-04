import Tab from './Tab';
import { levenshtein } from '../../app/lib';
import List from './List';

type TabsProps = {
  savedTabs: SavedTab[];
};

export default function Tabs({ savedTabs }: TabsProps) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      <List title="Saved Tabs">
        {savedTabs.map(({ savedAt, url, isPinned }) => (
          // TODO: need unique key, savedAt might work in prod
          <Tab key={savedAt} url={url} isPinned={isPinned} savedAt={savedAt} />
        ))}
      </List>
    </section>
  );
}
