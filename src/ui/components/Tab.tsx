import PinCheckbox from './PinCheckbox';
import { SavedTab } from '../../types/types';
import { daysAgo } from '../../app/lib';
import Box from './Box';
import { TrashIcon } from '@radix-ui/react-icons';
import Button from './Button';
import '../../styles/Tab.scss';
import Tooltip from './Tooltip';

type TabProps = {
  savedAt: number;
  url: string;
  isPinned: boolean;
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTab[]>>;
  savedTabs: SavedTab[];
  id: string;
};

export default function Tab({
  savedAt,
  url,
  isPinned,
  setSavedTabs,
  savedTabs,
  id
}: TabProps) {
  const onTrashClick = () => {
    const newSavedTabs = savedTabs.filter((tab) => tab.id !== id);
    setSavedTabs(newSavedTabs);
    chrome.runtime.sendMessage({
      type: 'update-saved-tabs',
      payload: newSavedTabs
    });
  };

  return (
    <div className="tab">
      <PinCheckbox
        savedTabs={savedTabs}
        id={id}
        setSavedTabs={setSavedTabs}
        isPinned={isPinned}
      />
      <Box width={'48px'} height={'100%'} className="days-box">
        {daysAgo(savedAt)}
      </Box>
      <Tooltip content={url} delay={1500}>
        <a
          style={{ whiteSpace: 'nowrap' }}
          className="tab-anchor"
          href={url}
          target="_blank"
        >
          {url}
        </a>
      </Tooltip>
      <Button className="trash-button" onClick={onTrashClick}>
        {<TrashIcon />}
      </Button>
    </div>
  );
}
