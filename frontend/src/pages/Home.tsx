import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@mui/material';
import { Section } from '../components/blocks/Section';
import SearchIcon from '@mui/icons-material/Search';
import {
  SlideFade,
  type SlideFadeRef,
} from '../components/blocks/SlideFade/SlideFade';
import { useRef, useState, useEffect } from 'react';
import { useGemini } from '../utilities/useGemini';
import { ResultSection } from '../components/sections/ResultsSection/ResultSection';

export const Home = () => {
  const [search, setSearch] = useState<string>('');
  const slideFadeRef = useRef<SlideFadeRef>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);

  const { data, loading, error, generateData, resetData } = useGemini();

  const fadeOut = () => {
    slideFadeRef.current?.hide();
    setTimeout(() => {
      if (searchSectionRef.current) {
        searchSectionRef.current.style.display = 'none';
      }
    }, 200);
  };

  const onSearch = async () => {
    fadeOut();
    await generateData(search);
    console.log(data);
  };

  const resetSearch = () => {
    setSearch('');
    resetData?.();
    if (searchSectionRef.current) {
      searchSectionRef.current.style.display = 'flex';
    }
    slideFadeRef.current?.show();
  };

  useEffect(() => {
    console.log('Updated data:', data);
  }, [data]);

  return (
    <Section id="home">
      {/* Loading Indicator */}
      {loading && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: '70vh', width: '100%' }}
        >
          <CircularProgress size={60} color="primary" />
        </Stack>
      )}

      {/* Search Area */}
      {!data && !loading && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: '65vh', width: '100%' }}
        >
          <SlideFade ref={slideFadeRef} direction="down">
            <Stack
              justifyContent="center"
              alignItems="center"
              ref={searchSectionRef}
              spacing={2}
            >
              <Typography
                variant="h4"
                color="#1976d2"
                fontWeight="bold"
                textAlign="center"
              >
                AI Fact Checker
              </Typography>
              <Typography fontSize="18px" color="#767676ff" textAlign="center">
                Retrieve an unbiased breakdown for a specific question
              </Typography>

              <TextField
                label="Fact to check"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch(); // Call your search function
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: '50px' },
                }}
              />

              <Button
                variant="contained"
                sx={{ width: '200px', py: 1.5, mt: 3 }}
                onClick={onSearch}
                disabled={loading || !search}
              >
                Search
              </Button>
            </Stack>
          </SlideFade>
        </Stack>
      )}

      {/* Result Section */}
      {data !== null && !loading && (
        <Stack
          px={{ xs: 2, sm: 4, md: 5 }}
          spacing={2}
          sx={{ width: '100%', overflowX: 'hidden' }}
        >
          {data?.error && (
            <Typography color="error" fontSize="16px" mt={2}>
              {error}
            </Typography>
          )}
          <ResultSection data={data} />

          <Stack direction="row" width="100%" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '250px', py: 1, mt: 7 }}
              onClick={resetSearch}
            >
              Ask Another Question
            </Button>
          </Stack>
        </Stack>
      )}
    </Section>
  );
};
