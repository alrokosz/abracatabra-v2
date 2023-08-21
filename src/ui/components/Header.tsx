import SettingsIcon from "./SettingsIcon";
import SwitchButton from "./SwitchButton";

export default function Header() {
  return (
    <div className="flex align-middle justify-around p-4 ">
      <SettingsIcon />
      <SwitchButton />
    </div>
  );
}
