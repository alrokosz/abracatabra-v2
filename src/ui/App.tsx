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
    <>
      <SettingsIcon currentView={currentView} setCurrentView={setCurrentView} />
      <h1 className="title">
        ABRACA<span className="green">TAB</span>RA
      </h1>
      <Header isOn={isOn} />
      {/* <hr className="line" /> */}
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
          ignoredDomains={ignoredDomains}
          setCurrentView={setCurrentView}
        />
      </motion.div>
      {/* {currentView === 'tabs' ? (
        <Tabs setSavedTabs={setSavedTabs} savedTabs={savedTabs} />
      ) : (
        <Settings
          ignoredDomains={ignoredDomains}
          setCurrentView={setCurrentView}
        />
      )} */}
    </>
  );
}
