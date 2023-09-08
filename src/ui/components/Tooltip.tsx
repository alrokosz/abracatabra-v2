import * as Tooltip from '@radix-ui/react-tooltip';
import { PropsWithChildren } from 'react';
import '../../styles/Tooltip.scss';

type TooltipProps = {
  arrow?: boolean;
  content: string;
  sideOffset?: number;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export default function ({
  children,
  content,
  sideOffset = 5,
  delay = 700,
  side = 'top'
}: PropsWithChildren<TooltipProps>) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={delay}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent"
            sideOffset={sideOffset}
            side={side}
          >
            {content}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
