import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { GearIcon } from '@radix-ui/react-icons';

export default function SettingsIcon() {
  return (
    <button className="setting-btn">
      <GearIcon />
      {/* <AccessibleIcon.Root label="settings" /> */}
    </button>
  );
}
