import Button from './Button';
import SwitchButton from './SwitchButton';

export default function Header({ isOn }: { isOn: boolean }) {
  const onButtonClick = () => {
    chrome.runtime.sendMessage({ type: 'save-and-close' });
  };

  return (
    <div className="app-header">
      <SwitchButton isOn={isOn} />
      <Button onClick={onButtonClick}>Save and remove tab</Button>
    </div>
  );
}
