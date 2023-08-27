import { Dispatch, SetStateAction, useState } from 'react';
import Slider from './Slider';
import List from './List';

type SettingsProps = {
  setCurrentView: Dispatch<SetStateAction<string>>;
};

export default function Settings({ setCurrentView }: SettingsProps) {
  const [hours, setHours] = useState(24);

  const onHoursChange = (value: number[]) => {
    console.log(value);
    setHours(value[0]);
  };

  return (
    <div className="settings-view">
      <button onClick={() => setCurrentView('tabs')}>Go Home</button>
      <p>Idle tabs will be removed after {hours} hours</p>
      <Slider
        max={96}
        min={12}
        defaultValue={24}
        step={6}
        onValueCommit={onHoursChange}
      />
      <p>Do not remove tags from following URLS</p>
      <List />
    </div>
  );
}
