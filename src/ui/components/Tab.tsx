import PinCheckbox from './PinCheckbox';
import * as Separator from '@radix-ui/react-separator';
import { SavedTab } from '../../types/types';
import { daysAgo } from '../../app/lib';

type TabProps = {
  savedAt: number;
  url: string;
  isPinned: boolean;
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTab[]>>;
  id: string;
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
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 8px' }}
      />
      <a
        style={{ whiteSpace: 'nowrap' }}
        className="tab-anchor"
        href={url}
        target="_blank"
      >
        {url}
      </a>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{ margin: '0 8px' }}
      />
      <div>{daysAgo(savedAt)}</div>
    </div>
  );
}
