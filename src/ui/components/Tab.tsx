import {
  StarFilledIcon,
  StarIcon,
  DividerVerticalIcon
} from '@radix-ui/react-icons';

type TabProps = {
  tab: number;
};

export default function Tab({ tab }: TabProps) {
  return <li>this is tab {tab}</li>;
}
