import * as ScrollArea from '@radix-ui/react-scroll-area';
import '../../styles/List.scss';
import { PropsWithChildren } from 'react';

type ListProps = {
  title?: string;
};

export default function List({
  children,
  title
}: PropsWithChildren<ListProps>) {
  const TAGS = Array.from({ length: 50 }).map((_, i, a) => `www.sdfasdf.com`);
  return (
    <div className="List">
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div style={{ padding: '15px 0 0 0' }}>
            <div className="Text">{title}</div>
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
