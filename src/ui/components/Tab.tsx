import PinCheckbox from './PinCheckbox';

type TabProps = {
  savedAt: number;
  url: string;
  isPinned: boolean;
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTab[]>>;
  id: number;
};

export default function Tab({
  savedAt,
  url,
  isPinned,
  setSavedTabs,
  id
}: TabProps) {
  return (
    <div className="tab">
      <PinCheckbox id={id} setSavedTabs={setSavedTabs} isPinned={isPinned} />
      <span>|</span>
      <a href={url}>{url}</a>
    </div>
  );
}
