import Header from './components/Header';
import '../styles/popup.scss';
import Tabs from './components/Tabs';
import SettingsIcon from './components/SettingsIcon';
import { useEffect, useState } from 'react';
import Settings from './components/Settings';
import * as Separator from '@radix-ui/react-separator';
import { motion } from 'framer-motion';

export default function App() {
  const [currentView, setCurrentView] = useState<'tabs' | 'settings'>('tabs');
  const [isOn, setIsOn] = useState(false);
  const [ignoredDomains, setIgnoredDomains] = useState<string[]>([]);
  const [savedTabs, setSavedTabs] = useState([]);
  const [idleTabTime, setIdleTabTime] = useState(24);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInitialState = async () => {
      const { isOn, ignoredDomains, savedTabs, idleTabTime } =
        await chrome.runtime.sendMessage({
          type: 'popup-opened'
        });
      setIsOn(isOn);
      setIgnoredDomains(ignoredDomains);
      setSavedTabs(savedTabs);
      setIdleTabTime(idleTabTime);
      setIsLoading(false);
    };
    getInitialState();
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <SettingsIcon currentView={currentView} setCurrentView={setCurrentView} />
      <h1 className="title">
        ABRACA<span className="green">TAB</span>RA
      </h1>
      <Header setIsOn={setIsOn} isOn={isOn} />
      <Separator.Root
        className="SeparatorRoot"
        style={{ color: 'black', marginTop: '10px' }}
      />

      <motion.div
        style={{ display: 'flex', width: '200%' }}
        initial={false}
        className="tabs-settings-wrapper"
        animate={{
          x: currentView === 'settings' ? '-50%' : 0
        }}
      >
        <Tabs setSavedTabs={setSavedTabs} savedTabs={savedTabs} />
        <Settings
          setIdleTabTime={setIdleTabTime}
          idleTabTime={idleTabTime}
          ignoredDomains={ignoredDomains}
          setIgnoredDomains={setIgnoredDomains}
        />
      </motion.div>
    </>
  );
}
