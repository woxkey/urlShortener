import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Container} from '@mui/system';
import React, {useEffect, useState} from 'react';
import {getShortenLink, handleOriginalUrl} from './features/links/linkSlice';
import {useAppDispatch, useAppSelector} from './hooks';
import ILinkDTO from './types/ILinkDTO';
import {checkHttpUrl} from './utils/checkUrl';

const textFieldStyle = {
  width: '400px',
  color: '#161c34',
  backgroundColor: 'white',
  borderRadius: '4px',
};

const App = () => {
  const {shortUrl} = useAppSelector((state) => state.links.link);
  const [linkState, setlinkState] = useState<string>('');
  const [errorLink, setErrorLink] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlinkState(e.target.value);
    dispatch(handleOriginalUrl(linkState));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkHttpUrl(linkState)) {
      setErrorLink(true);
      return;
    }
    setErrorLink(false);
    const link: ILinkDTO = {
      originalUrl: linkState,
    };
    dispatch(getShortenLink(link));
  };

  useEffect(() => {}, [shortUrl]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          paddingTop: '200px',
        }}
        component={'form'}
        onSubmit={handleSubmit}
      >
        <Typography
          sx={{
            color: '#fff',
          }}
          variant={'h2'}
          component={'h1'}
        >
          Free URL Shortener
        </Typography>
        <Typography sx={{color: '#b9b9b9'}} component={'p'}>
          This is a free tool to shorten URLs. Create short & memorable links in
          seconds.
        </Typography>
        <Box sx={{display: 'flex', gap: '10px'}} component={'div'}>
          <TextField
            sx={textFieldStyle}
            onChange={handleInput}
            id="outlined-basic"
            label={errorLink ? 'Incorrect link' : 'Enter your link here'}
            variant="filled"
            required
            error={errorLink}
          />
          <Button sx={{width: '231px'}} type="submit" variant="contained">
            Shorten URL
          </Button>
        </Box>
      </Box>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '40px',
        }}
      >
        {shortUrl && (
          <>
            <Typography sx={{color: '#fff'}} variant="h4">
              Your link now looks like this:
            </Typography>

            <Button
              sx={{textTransform: 'lowercase', fontSize: '20px'}}
              target={'_blank'}
              href={shortUrl}
            >
              {shortUrl}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default App;
