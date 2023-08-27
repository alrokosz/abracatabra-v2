import Button from './Button';
import SwitchButton from './SwitchButton';

export default function Header() {
  return (
    <div className="app-header">
      <SwitchButton />
      <Button>Save and remove tab</Button>
    </div>
  );
}
