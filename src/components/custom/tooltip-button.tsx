import * as React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ButtonWithTooltipProps extends ButtonProps {
  tooltipText: string;
  tooltipProps?: React.ComponentPropsWithoutRef<typeof TooltipContent>;
}

const ButtonWithTooltip = React.forwardRef<HTMLButtonElement, ButtonWithTooltipProps>(
  ({ tooltipText, tooltipProps, ...buttonProps }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button ref={ref} {...buttonProps} />
          </TooltipTrigger>
          <TooltipContent {...tooltipProps}>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

ButtonWithTooltip.displayName = 'ButtonWithTooltip';

export { ButtonWithTooltip };
