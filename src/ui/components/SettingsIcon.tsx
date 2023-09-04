import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { GearIcon, HomeIcon } from '@radix-ui/react-icons';
import '../../styles/SettingsIcon.scss';
import { Dispatch, SetStateAction, useEffect } from 'react';

type SettingsIcon = {
  currentView: string;
  setCurrentView: Dispatch<SetStateAction<'tabs' | 'settings'>>;
};

export default function SettingsIcon({
  setCurrentView,
  currentView
}: SettingsIcon) {
  const Icon = currentView === 'tabs' ? GearIcon : HomeIcon;

  return (
    <button
      onClick={() => {
        setCurrentView((cur) => (cur === 'tabs' ? 'settings' : 'tabs'));
      }}
      className="settings-btn"
    >
      <Icon height={20} width={20} />
      {/* <AccessibleIcon.Root label="settings" /> */}
    </button>
  );
}
