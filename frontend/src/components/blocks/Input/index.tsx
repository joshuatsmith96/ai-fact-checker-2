import { TextField, InputAdornment } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

export const Input = ({
    label,
    id,
    sx = [],
    multiline,
    onChange,
}: { label?: string; id?: string; sx?: SxProps<Theme>, multiline?: boolean, onChange?: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; }) => {
    return (
        <TextField
            id={id}
            label={label}
            onChange={onChange}
            variant="filled"
            multiline={multiline ? multiline : false}
            minRows={8}
            maxRows={8}
            sx={[
                {
                    width: '100%',
                    color: 'white',
                    background: '#646464ff',
                    '& .MuiInputBase-input': {
                        color: 'white',
                    },
                    borderRadius: 2,
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                    },
                    '& .MuiFilledInput-underline:hover:before': {
                        borderBottomColor: '#edf8ffff',
                    },
                    '& .MuiFilledInput-underline:after': {
                        borderBottomColor: '#8dd3ffff',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start" sx={{ color: 'white' }} />
                    ),
                },
            }}
        />
    );
};
