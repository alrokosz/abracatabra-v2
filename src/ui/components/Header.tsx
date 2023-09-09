import Button from './Button';
import SwitchButton from './SwitchButton';

type headerProps = {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ isOn, setIsOn }: headerProps) {
  const onButtonClick = (e: any) => {
    e.preventDefault();
    chrome.runtime.sendMessage({ type: 'save-and-close' });
  };

  return (
    <div className="app-header">
      <SwitchButton isOn={isOn} setIsOn={setIsOn} />
      <Button onClick={onButtonClick}>Save and remove tab</Button>
    </div>
  );
}
