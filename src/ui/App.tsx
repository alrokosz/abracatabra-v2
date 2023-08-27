import Header from './components/Header';
import '../styles/popup.scss';
import Tabs from './components/Tabs';
import SettingsIcon from './components/SettingsIcon';

export default function App() {
  return (
    <>
      <SettingsIcon />
      <h1 className="title">
        ABRACA<span className="green">TAB</span>RA
      </h1>
      <Header />
      <hr className="line" />
      <Tabs />
    </>
  );
}
