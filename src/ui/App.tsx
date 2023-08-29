import Header from './components/Header';
import '../styles/popup.scss';
import Tabs from './components/Tabs';
import SettingsIcon from './components/SettingsIcon';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Settings from './components/Settings';

export default function App() {
  const [currentView, setCurrentView] = useState<'tabs' | 'settings'>('tabs');

  useEffect(() => {
    chrome.runtime
      .sendMessage({ type: 'popup-opened' })
      .then((res) => console.log({ res }));
  }, []);

  return (
    <>
      <SettingsIcon currentView={currentView} setCurrentView={setCurrentView} />
      <h1 className="title">
        ABRACA<span className="green">TAB</span>RA
      </h1>
      <Header />
      <hr className="line" />
      {currentView === 'tabs' ? (
        <Tabs />
      ) : (
        <Settings setCurrentView={setCurrentView} />
      )}
    </>
  );
}
