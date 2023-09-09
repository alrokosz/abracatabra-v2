import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';
import '../../styles/popup.scss';

type SwithButtonProps = {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SwitchButton({ isOn, setIsOn }: SwithButtonProps) {
  const onCheckedChange = () => {
    setIsOn(!isOn);
    chrome.runtime.sendMessage({
      type: 'isOn-changed',
      payload: !isOn
    });
  };

  return (
    <form className="on-off-switch">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label
          className="Label"
          htmlFor="on-off-switch"
          style={{ paddingRight: 15, color: 'black' }}
        >
          {isOn ? <span className="green">On </span> : 'Off'}
        </label>
        <Switch.Root
          onCheckedChange={onCheckedChange}
          checked={isOn}
          className="SwitchRoot"
          id="on-off-switch"
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </div>
    </form>
  );
}
