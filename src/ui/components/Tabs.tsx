import Tab from './Tab';

export default function Tabs() {
  //TODO: get tabs from local storage
  const tabs = [1, 2, 3, 4, 5];
  return (
    <>
      <ul>
        {tabs.map((tab) => (
          <Tab tab={tab} />
        ))}
      </ul>
    </>
  );
}
