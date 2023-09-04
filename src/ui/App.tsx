import Header from './components/Header';
import '../styles/popup.scss';
import Tabs from './components/Tabs';
import SettingsIcon from './components/SettingsIcon';
import { useEffect, useState } from 'react';
import Settings from './components/Settings';

export default function App() {
  const [currentView, setCurrentView] = useState<'tabs' | 'settings'>('tabs');
  const [isOn, setIsOn] = useState(false);
  const [ignoredDomains, setIgnoredDomains] = useState([]);
  const [savedTabs, setSavedTabs] = useState([]);

  useEffect(() => {
    const getInitialState = async () => {
      const { isOn, ignoredDomains, savedTabs } =
        await chrome.runtime.sendMessage({
          type: 'popup-opened'
        });
      setIsOn(isOn);
      setIgnoredDomains(ignoredDomains);
      setSavedTabs(savedTabs);
    };
    getInitialState();
  }, []);

  return (
    <div className="container">
      <SettingsIcon currentView={currentView} setCurrentView={setCurrentView} />
      <h1 className="title">
        ABRACA<span className="green">TAB</span>RA
      </h1>
      <Header isOn={isOn} />
      <hr className="line" />
      {currentView === 'tabs' ? (
        <Tabs setSavedTabs={setSavedTabs} savedTabs={savedTabs} />
      ) : (
        <Settings
          ignoredDomains={ignoredDomains}
          setCurrentView={setCurrentView}
        />
      )}
    </div>
  );
}
