import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';
import '../../styles/popup.scss';

export default function SwitchButton() {
  const [isChecked, setIsChecked] = useState(false);
  console.log({ isChecked });

  return (
    <form className="on-off-switch">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label
          className="Label"
          htmlFor="on-off-switch"
          style={{ paddingRight: 15, color: 'black' }}
        >
          {isChecked ? <span className="green">On </span> : 'Off'}
        </label>
        <Switch.Root
          onCheckedChange={() => setIsChecked(!isChecked)}
          className="SwitchRoot"
          id="on-off-switch"
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </div>
    </form>
  );
}
