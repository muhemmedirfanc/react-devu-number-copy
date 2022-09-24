import { useState,useEffect } from 'react';

import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getNumbers, login } from '../../utils/firestore';
import {CopyToClipboard} from 'react-copy-to-clipboard';




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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(null);
  const [numbers,setNumbers] = useState([])
  const [copyButtonText,setCopyButtonText] = useState("Copy")
  

  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  
  useEffect(() => {
         if(showSuccessScreen === true){
getNumbers().then((response)=>{
    setNumbers(response)
   
})
         }
}, [showSuccessScreen])



const handleLogin = ()=>{
    login(email,password).then((response)=>{

       

       if(response.status === false){
        setShowError(true);

        setTimeout(() => {
          setShowError(false);
        }, 1000);
       }else{

        setShowSuccessScreen(true)

       }
    })
}

 

  return (
    <>
      <RootBox>
          {!showSuccessScreen ? (
        <ContainerBox>
            <TextBox>
              <Typography variant="h4" sx={{ color: 'white', textTransform: 'uppercase', textAlign: 'center' }}>
                Login
              </Typography>

              {showError && (
                <Typography variant="body2" sx={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                    Invalid credentials
                </Typography>
              )}

              <Box sx={{ marginTop: '2rem' }}>
                <CustomTextField
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={(event) => setEmail(event.target.value)}
                ></CustomTextField>
              </Box>
              
              <Box >
                <CustomTextField
                  label="Password"
                  value={password}
                  variant="outlined"
                  onChange={(event) => setPassword(event.target.value)}
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
                  onClick={handleLogin}
             
                >
                 Login
                </Button>
              </Box>
            </TextBox>
              </ContainerBox>
          ) : (
            <>
<Box width="100%"  paddingTop="1rem" display="flex" justifyContent="flex-end" marginLeft="-1rem">
            
<CopyToClipboard text={`${numbers.map((number)=> number.number).join('\n')}`}
          >
               <Button
                  sx={{
                    color: '#84C69B',
                    textTransform:'capitalize'
                  }}
                  variant="text"
                  onClick={()=> setCopyButtonText('Copied')}
             
                >
                 {copyButtonText}
                </Button>
          </CopyToClipboard>

</Box>

            {
                numbers.map((number,index)=>{
                   
                    return (
                        <Typography key={index} variant="subtitle2" sx={{ color: 'white', textAlign: 'left', marginBottom: '0.1rem', paddingLeft:'1rem' }}>
                       { number.number}
                      </Typography>
                    )
                })
            }
           
         
              
            </>
          )}
      </RootBox>
    </>
  );
}

export default Login;


