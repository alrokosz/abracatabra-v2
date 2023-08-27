import Tab from './Tab';

export default function Tabs() {
  //TODO: get tabs from local storage
  const tabs = [1, 2, 3, 4, 5];
  return (
    <section>
      <h1>Saved Tabs</h1>
      {tabs.map((tab) => (
        <Tab
          tabId={tab}
          url={'https://developer.chrome.com/docs/extensions/mv3/'}
          starred={tab % 2 === 0}
        />
      ))}
    </section>
  );
}
