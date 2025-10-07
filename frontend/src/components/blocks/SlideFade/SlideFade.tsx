import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Slide, Fade } from '@mui/material';

export interface SlideFadeRef {
  hide: () => void;
  show: () => void;
}

interface SlideFadeProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  timeout?: number;
}

export const SlideFade = forwardRef<SlideFadeRef, SlideFadeProps>(
  ({ children, direction = 'up', timeout = 500 }, ref) => {
    const [visible, setVisible] = useState(true);

    useImperativeHandle(ref, () => ({
      hide: () => setVisible(false),
      show: () => setVisible(true),
    }));

    return (
      <Fade in={visible} timeout={timeout} mountOnEnter>
        <Box>
          <Slide in={visible} direction={direction} timeout={timeout} mountOnEnter>
            <Box>{children}</Box>
          </Slide>
        </Box>
      </Fade>
    );
  }
);
