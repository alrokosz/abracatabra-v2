import * as ScrollArea from '@radix-ui/react-scroll-area';
import '../../styles/List.scss';

export default function List() {
  const TAGS = Array.from({ length: 50 }).map((_, i, a) => `www.sdfasdf.com`);
  return (
    <div className="List">
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div style={{ padding: '15px 0 0 0' }}>
            <div className="Text">Ignored URL's</div>
            {TAGS.map((tag) => (
              <div className="Tag" key={tag}>
                {tag}
              </div>
            ))}
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
