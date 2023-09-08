import PinCheckbox from './PinCheckbox';
import * as Separator from '@radix-ui/react-separator';

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
  const singleDay = 3600000 * 24;
  const daysAgo = Math.floor((Date.now() - savedAt) / singleDay);

  return (
    <div className="tab">
      <PinCheckbox id={id} setSavedTabs={setSavedTabs} isPinned={isPinned} />
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 8px' }}
      />
      <a className="tab-anchor" href={url}>
        {url}
      </a>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 8px' }}
      />
      <div>{daysAgo}</div>
    </div>
  );
}
