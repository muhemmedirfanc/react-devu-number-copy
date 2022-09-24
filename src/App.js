import { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { addData } from './utils/firestore';

import tickSvg from './assets/svgs/Eo_circle_green_checkmark.svg';

const RootBox = styled(Box)({
  backgroundColor: '#303841',
  minHeight: '100vh',
});

const ContainerBox = styled(Box)({ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' });

const TextBox = styled(Box)({
  marginTop: '-10rem',
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginTop: '35px',
  width: '600px',

  [theme.breakpoints.down('md')]: {
    width: '400px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },

  [theme.breakpoints.down(300)]: {
    width: '200px',
  },

  '& label.Mui-focused': {
    color: 'white',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
      borderWidth: '3px',
    },

    '&:hover fieldset': {
      borderColor: 'white',
      borderWidth: '3px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#BEF992',
      borderWidth: '3px',
    },
  },

  '& .MuiInputLabel-root': {
    color: 'white',
  },

  '& .MuiOutlinedInput-input': {
    color: 'white',
  },

  '& input[type=number]': {
    '-moz-appearance': 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
}));

function App() {
  const [number, setNumber] = useState('');
  const [showError, setShowError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('Invalid number');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const handleSubmit = () => {
    //check if number is valid

    if (number === '' || number?.toString()?.length !== 10) {
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 700);

      return;
    }

    setNumber('');

    addData({ number, ua: navigator.userAgent }).then((response) => {
      if (response === true) {
        setShowSuccessScreen(true);
      } else {
        setShowError(true);
        setErrorMessage('Something went wrong try agin');

        setTimeout(() => {
          setShowError(false);
          setErrorMessage('Invalid number');
        }, 1000);
      }
    });
  };

  return (
    <>
      <RootBox>
        <ContainerBox>
          {!showSuccessScreen ? (
            <TextBox>
              <Typography variant="h4" sx={{ color: 'white', textTransform: 'uppercase', textAlign: 'center' }}>
                Add Number
              </Typography>

              {showError && (
                <Typography variant="body2" sx={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                  {errorMessage}
                </Typography>
              )}

              <Box sx={{ marginTop: '2rem' }}>
                <CustomTextField
                  label="Number"
                  value={number}
                  type="number"
                  variant="outlined"
                  onChange={(event) => setNumber(event.target.value)}
                ></CustomTextField>
              </Box>

              <Box width="100%" display="flex" justifyContent="center">
                <Button
                  sx={{
                    marginTop: '1.5rem',
                    width: '10rem',
                    color: 'white',
                    backgroundColor: '#84C69B',
                    '&:hover': {
                      backgroundColor: '#2F8886',
                    },
                  }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </TextBox>
          ) : (
            <>
              <img
                src={tickSvg}
                alt="success"
                style={{
                  height: '10rem',
                }}
              />
              <Typography variant="h6" sx={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>
                Success
              </Typography>
            </>
          )}
        </ContainerBox>
      </RootBox>
    </>
  );
}

export default App;
