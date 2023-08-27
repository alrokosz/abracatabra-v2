import { DrawingPinIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useState } from 'react';

export default function PinCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <form className="checkbox-pin">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox.Root
          onCheckedChange={() => setIsChecked(!isChecked)}
          checked={isChecked}
          className="CheckboxRoot"
          id="c1"
        >
          {/* <Checkbox.Indicator className="CheckboxIndicator">
            <DrawingPinIcon />
          </Checkbox.Indicator> */}
          {isChecked ? (
            <DrawingPinFilledIcon fill="limegreen" />
          ) : (
            <DrawingPinIcon fill="limegreen" />
          )}
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
