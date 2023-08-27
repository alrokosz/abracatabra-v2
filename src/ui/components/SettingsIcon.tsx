import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { GearIcon, HomeIcon } from '@radix-ui/react-icons';
import '../../styles/SettingsIcon.scss';
import { Dispatch, SetStateAction } from 'react';

type SettingsIcon = {
  currentView: string;
  setCurrentView: Dispatch<SetStateAction<string>>;
};

export default function SettingsIcon({
  setCurrentView,
  currentView
}: SettingsIcon) {
  chrome.storage.sync.get('testing').then((result) => {
    console.log('Value currently is ' + result.key);
  });
  return (
    <button
      onClick={() => {
        setCurrentView((cur) => (cur === 'tabs' ? 'settings' : 'tabs'));
      }}
      className="settings-btn"
    >
      {currentView === 'tabs' ? (
        <GearIcon height={20} width={20} />
      ) : (
        <HomeIcon height={20} width={20} />
      )}
      {/* <AccessibleIcon.Root label="settings" /> */}
    </button>
  );
}
