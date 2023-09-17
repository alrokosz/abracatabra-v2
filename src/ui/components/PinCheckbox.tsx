import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Tooltip from './Tooltip';
import { SavedTab } from '../../types/types';

type PinCheckBoxProps = {
  isPinned: boolean;
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTab[]>>;
  id: string;
  savedTabs: SavedTab[];
};

export default function PinCheckbox({
  isPinned,
  setSavedTabs,
  savedTabs,
  id
}: PinCheckBoxProps) {
  const Tag = isPinned ? DrawingPinFilledIcon : DrawingPinIcon;

  const onCheckedChange = () => {
    const newSavedTabs = savedTabs.map((tab) => {
      if (tab.id === id) {
        tab.isPinned = !isPinned;
      }
      return tab;
    });
    setSavedTabs(newSavedTabs);
    chrome.runtime.sendMessage({
      type: 'update-saved-tabs',
      payload: newSavedTabs
    });
  };

  return (
    <Tooltip content={'Pin saved tab'}>
      <form className="checkbox-pin">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox.Root
            onCheckedChange={onCheckedChange}
            checked={isPinned}
            className="CheckboxRoot"
            id="c1"
          >
            <Tag color="green" />
          </Checkbox.Root>
          <VisuallyHidden.Root>
            <label className="Label" htmlFor="c1">
              save to pinned urls
            </label>
          </VisuallyHidden.Root>
        </div>
      </form>
    </Tooltip>
  );
}
