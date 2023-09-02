import Tab from './Tab';
import { levenshtein } from '../../app/lib';
import List from './List';

export default function Tabs() {
  //TODO: get tabs from local storage
  const tabs = Array.from({ length: 100 }).map((el, i, arr) => {
    return {
      url: 'dmfgbkerjg;qoejv;oherg;ow;oerhg;oehrgoqergoqheg',
      tabId: i,
      isPinned: i % 2 === 0
    };
  });
  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      <List title="Saved Tabs">
        {tabs.map(({ tabId, url, isPinned }) => (
          <Tab key={tabId} tabId={tabId} url={url} isPinned={isPinned} />
        ))}
      </List>
    </section>
  );
}
