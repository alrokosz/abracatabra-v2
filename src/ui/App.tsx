import Header from './components/Header';
import '../styles/popup.scss';
import Tabs from './components/Tabs';

export default function App() {
  return (
    <>
      <h1 className="title">
        ABRACA<span className="green">TAB</span>RA
      </h1>
      <Header />
      <hr className="line" />
      <Tabs />
    </>
  );
}
