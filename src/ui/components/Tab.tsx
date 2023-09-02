import PinCheckbox from './PinCheckbox';

type TabProps = {
  tabId: number;
  url: string;
  isPinned: boolean;
};

export default function Tab({ tabId, url, isPinned }: TabProps) {
  return (
    <div className="tab">
      <PinCheckbox isPinned={isPinned} />
      <span>|</span>
      <a href={url}>{url}</a>
    </div>
  );
}
