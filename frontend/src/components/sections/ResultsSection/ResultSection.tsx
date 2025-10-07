import { Link, List, ListItem, Stack, Typography } from '@mui/material';
import { Section } from '../../blocks/Section';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { isGeminiError } from '../../../utilities/typeGuard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResultSection = ({ data }: { data: any }) => {
  if (isGeminiError(data)) {
    return (
      <Section>
        <Stack alignItems="center" gap={2} sx={{ paddingTop: 5 }}>
          <ErrorOutlineIcon fontSize="large" color="error" />
          <Typography variant="h6" color="error" textAlign="center">
            {data.error}
          </Typography>
        </Stack>
      </Section>
    );
  }

  const aiData = data[0];

  return (
    <Section>
      <Stack gap={3} width={'100%'}>
        <Stack sx={{ width: '100%' }}>
          <Typography fontWeight={'bold'} fontSize={'18px'}>
            User's Question
          </Typography>
          <Typography color="#4c4c4cff">{aiData.users_question}</Typography>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            backgroundColor: '#e9e9e9ff',
            width: '100%',
            padding: 2,
            boxSizing: 'border-box',
            borderRadius: 2,
          }}
        >
          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <ErrorOutlineIcon />
            <Typography fontSize={'20px'} fontWeight={'bold'}>
              {aiData.validity}
            </Typography>
          </Stack>
          <Typography>Confidence: {aiData.confidence}%</Typography>
        </Stack>
        <Stack width={'100%'}>
          <Typography variant="h6" fontWeight={'bold'}>
            Verified Facts
          </Typography>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {aiData.verified_facts.map((fact: any, index: number) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ fontSize: '16px', fontWeight: 'bold' }}
              >
                {fact.category}
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '5px 40px 5px 40px' }}>
                <List sx={{ listStyleType: 'disc' }}>
                  {fact.facts.map((f: string) => (
                    <ListItem sx={{ display: 'list-item' }}>
                      <Typography>{f}</Typography>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
        <Stack gap={2}>
          <Typography variant="h6" fontWeight={'bold'}>
            Source References
          </Typography>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {aiData.sources.map((source: any) => (
            <Link href={source.source_link}>
              <Stack
                key={source.id}
                direction={'row'}
                gap={3}
                alignItems={'center'}
              >
                <InsertLinkIcon />
                <Stack>
                  <Typography>{source.title}</Typography>
                  <Typography>{source.source_description}</Typography>
                </Stack>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Section>
  );
};
