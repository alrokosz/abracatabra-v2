import Button from './Button';
import SwitchButton from './SwitchButton';

export default function Header() {
  const onButtonClick = () => {
    chrome.runtime.sendMessage({ type: 'save-and-close' });
  };

  return (
    <div className="app-header">
      <SwitchButton />
      <Button onClick={onButtonClick}>Save and remove tab</Button>
    </div>
  );
}
