import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { GearIcon } from '@radix-ui/react-icons';
import '../../styles/SettingsIcon.scss';

export default function SettingsIcon() {
  return (
    <button className="settings-btn">
      <GearIcon height={20} width={20} />
      {/* <AccessibleIcon.Root label="settings" /> */}
    </button>
  );
}
