import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useState } from 'react';

type PinCheckBoxProps = {
  isPinned: boolean;
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTab[]>>;
  id: number;
};

export default function PinCheckbox({
  isPinned: pin,
  setSavedTabs,
  id
}: PinCheckBoxProps) {
  const [isPinned, setIsPinned] = useState(pin);
  const Tag = isPinned ? DrawingPinFilledIcon : DrawingPinIcon;

  const onCheckedChange = () => {
    setIsPinned(!isPinned);
    setSavedTabs((savedTabs) => {
      return savedTabs.map((tab) => {
        if (tab.id === id) {
          tab.isPinned = !isPinned;
        }
        return tab;
      });
    });
  };

  return (
    <form className="checkbox-pin">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox.Root
          onCheckedChange={onCheckedChange}
          checked={isPinned}
          className="CheckboxRoot"
          id="c1"
        >
          <Tag fill="limegreen" />
        </Checkbox.Root>
        <VisuallyHidden.Root>
          <label className="Label" htmlFor="c1">
            save to pinned url's
          </label>
        </VisuallyHidden.Root>
      </div>
    </form>
  );
}
