import { Dispatch, SetStateAction, useState } from 'react';
import Slider from './Slider';
import List from './List';
import '../../styles/settings.scss';

type SettingsProps = {
  ignoredDomains: string[];
  setIgnoredDomains: React.Dispatch<React.SetStateAction<string[]>>;
  idleTabTime: number;
  setIdleTabTime: React.Dispatch<React.SetStateAction<number>>;
};

export default function Settings({
  ignoredDomains,
  setIgnoredDomains,
  idleTabTime,
  setIdleTabTime
}: SettingsProps) {
  const [addUrlValue, setAddUrlValue] = useState('');

  const onHoursChange = (value: number[]) => {
    setIdleTabTime(value[0]);
    chrome.runtime.sendMessage({
      type: 'remove-time-changed',
      payload: value[0]
    });
  };

  const onIgnoredUrlSubmit = (event: any) => {
    event.preventDefault();
    if (ignoredDomains.includes(''))
      setIgnoredDomains([addUrlValue, ...ignoredDomains]);
    setAddUrlValue('');
    chrome.runtime.sendMessage({
      type: 'ignored-domains-changed',
      payload: [addUrlValue, ...ignoredDomains]
    });
  };

  return (
    <div className="settings-view">
      <p>Idle tabs will be removed after {idleTabTime} hours</p>
      <Slider
        max={96}
        min={12}
        // defaultValue={idleTabTime || 24}
        value={idleTabTime || 24}
        step={6}
        onValueChange={onHoursChange}
      />
      <h1>Ignored urls</h1>
      <form onSubmit={onIgnoredUrlSubmit}>
        <input
          value={addUrlValue}
          onChange={(e) => setAddUrlValue(e.target.value)}
          type="text"
        />
        <button type="submit">add url</button>
      </form>
      <List>
        {ignoredDomains.map((tag, i) => (
          <div className="Tag" key={i}>
            {tag}
          </div>
        ))}
      </List>
    </div>
  );
}
