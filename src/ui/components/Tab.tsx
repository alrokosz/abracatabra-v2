import PinCheckbox from './PinCheckbox';

type TabProps = {
  tabId: number;
  url: string;
  starred: boolean;
};

export default function Tab({ tabId, url, starred }: TabProps) {
  return (
    <div className="tab">
      <PinCheckbox />
      {' | '}
      <a href={url}>{url}</a>
    </div>
  );
}
