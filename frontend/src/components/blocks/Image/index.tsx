import { Box, type SxProps, type Theme } from '@mui/material';

export const Image = ({ src, alt, sx }: { src: string, alt: string, sx?: SxProps<Theme> }) => {
    return (
        <Box
            component="img"
            src={src}
            alt={alt}
            width={'100%'}
            height={'auto'}
            sx={sx}
        />
    );
};