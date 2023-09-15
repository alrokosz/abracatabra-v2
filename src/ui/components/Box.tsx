import { PropsWithChildren } from 'react';
import '../../styles/Box.scss';

type DaysAgoProps = {
  width?: string;
  height?: string;
  className?: string;
};

export default function Box({
  width,
  height = '100%',
  children,
  className
}: PropsWithChildren<DaysAgoProps>) {
  return (
    <div style={{ height, width }} className={`${className || ''} Box`}>
      {children}
    </div>
  );
}
