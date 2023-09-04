import * as Switch from '@radix-ui/react-switch';
import { useEffect, useState } from 'react';
import '../../styles/popup.scss';

export default function SwitchButton({ isOn }: { isOn: boolean }) {
  const [isChecked, setIsChecked] = useState(isOn);

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: 'isOn-changed',
      payload: { isOn: isChecked }
    });
  }, [isChecked]);

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
