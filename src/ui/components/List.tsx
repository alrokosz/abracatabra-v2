import * as ScrollArea from '@radix-ui/react-scroll-area';
import '../../styles/List.scss';
import { PropsWithChildren } from 'react';

type ListProps = {
  title?: string;
  height?: number;
};

export default function List({
  children,
  height,
  title
}: PropsWithChildren<ListProps>) {
  const TAGS = Array.from({ length: 50 }).map((_, i, a) => `www.sdfasdf.com`);
  const style = height ? { height: `${height}px` } : {};
  return (
    <div className="List">
      <ScrollArea.Root style={style} className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div>
            {title && <div className="Text">{title}</div>}
            {children}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </div>
  );
}
