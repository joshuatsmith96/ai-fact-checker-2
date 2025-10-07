import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export const Alert = ({ children }: { children: ReactNode }) => (
  <Stack
    width={'100%'}
    top={0}
    left={'0%'}
    padding={2}
    sx={{ backgroundColor: '#fb622aff' }}
    alignItems={'center'}
    justifyContent={'center'}
    boxSizing={'border-box'}
  >
    <Typography
      textAlign={'center'}
      color={'white'}
      fontWeight={'bold'}
      width={'80%'}
    >
      {children}
    </Typography>
  </Stack>
);
