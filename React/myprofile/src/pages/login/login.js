import * as React from 'react';
import './login.css';
import { Box,Grid, Button, TextField} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect , useRef} from 'react';



function Login(){

  const navigate= useNavigate();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();

  const loginButtonRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        loginButtonRef.current.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
    const handleClick= async ()=> {
        const queryParams= `email=${email}&password=${password}`;
        await axios.post(`http://localhost:8085/api/V1/myprofile/login?${queryParams}`).then((res)=>{
            console.log(res.status)
            if(res.status===200){
          navigate('/profile')
            }
            else if(res.status===500){
                console.error('error occured')
                 navigate('/login')
              
            }
        })
    }

    const handleEmail =(e)=>{
    setEmail(e.target.value)
    }
    const handlePassword =(e)=>{
        setPassword(e.target.value)
        }

    return(
  <Box className='homepage'  sx={{ justifyContent:'center',
                                    justifyitems:'center',
                                    display:'flex' }}  item xs={12}>
                                      
                 <Box className='main-div' elevation={'20'} sx={{ justifyContent:'center',
                                                boxShadow:'20',
                                                borderRadius:['10px'],
                                                justifyitems:'center',
                                                display:'flex' }}  item xs={12}>
                
                        <Box className='inside-div' bgcolor={'white'}item xs={12}
                                                sx={{ justifyContent:'center',
                                                justifyitems:'center',
                                                display:'flex' }} >
                            
                                <Grid marginTop={'30px'} item xs={12}
                                                sx={{ justifyContent:'center',
                                                justifyitems:'center' }}>
                                <h3>Login</h3>
                                <h4>Don't you have Account.? <a href=''>Click here</a></h4>
                                <TextField id="filled-basic" label="Email" variant="filled" type="email" onChange={handleEmail}/> <br></br>
                                <TextField id="filled-basic" label="Password" variant="filled" type="password" onChange={handlePassword} /><br></br><br></br>
                                <Grid textAlign={'justify'}>
                                <a href=''>forgot password</a><br></br><br></br>
                                <Button variant="contained" endIcon={<LoginIcon />} onClick={handleClick} ref={loginButtonRef}>
                                         Login
                                </Button>
                                </Grid> 
                                </Grid>
                              
                              
                        </Box> 
                        <Box className='inside-div' bgcolor={'bisque'} item xs={12}
                                                sx={{ justifyContent:'center',
                                                justifyitems:'center',
                                                display:'flex' }} >
                           <p > <h2><i>WELCOME</i></h2> <br></br><br></br>
                           <h4>Everything around you that you call life was made up by people that were no smarter than you. 
                                And you can change it, you can influence it… Once you learn that, you'll never be the same again.
                                </h4></p>
                        </Box>
                       
                </Box>
                

  </Box>

    );
};

export default Login;