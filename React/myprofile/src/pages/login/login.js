import * as React from 'react';
import './login.css';
import { Box, Grid, Button, TextField, useMediaQuery } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from '../Loading Component/loading';
import Switch from '@mui/material/Switch';
import ColorSwitches from '../Loading Component/switch';

function Login() {
  const [isRotated, setIsRotated] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginButtonRef = useRef();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Adjust the breakpoint value as needed

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

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8086/api/V1/myprofile/login', {
        email: email,
        password: password
      });
console.log(email,password)
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.Token);
        sessionStorage.setItem('id', email);
        setIsLoading(false);

        Swal.fire({
          width: '400px',
          title: 'Login Success',
          text: 'Redirecting, please wait',
          timer: '1000'
        });

        navigate('/profile');
        setEmail('');
        setPassword('')
      } else if (response.status === 404) {
        setIsLoading(false);

        Swal.fire({
          width: '400px',
          title: 'Login Failure',
          text: '',
          timer: '1000'
        });

        console.error(response.data);
        navigate('/login');
      }
    } catch (error) {
      setIsLoading(false);
      window.location.reload()
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Invalid Username or Password..!',
        showConfirmButton: false,
        timer: 1500
       
      });
    }
   
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box className="homepage" sx={{ justifyContent: 'center', display: 'flex' }} item xs={12}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box className="main-div" sx={{ justifyContent: 'center', boxShadow: 20, borderRadius: '10px', display: 'flex' }}>
         
          <Grid container spacing={isMobile ? 2 : 4} >
           
            <Grid item xs={12} >
            <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
            <h2>Login/SignUp</h2>
            </Grid> 
            <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
                    <ColorSwitches/>
                    </Grid> 
              <Box className="inside-div" sx={{ justifyContent: 'center', display: 'flex' , transition: 'transform 0.5s ease',
                                                transform: `rotateY(${isRotated ? '180deg' : '0deg'})`}}>
                <Grid container spacing={2} direction={isMobile ? 'column' : 'row'} alignItems="center" sx={{ justifyContent: 'center'}}>
                  <Grid item xs={12} md={isMobile ? 12 : 6}>
                     
                   
                    <TextField id="email"  label="Email" variant="filled" type="email" onChange={handleEmail} />
                  
                    <TextField id="password" label="Password" variant="filled" type="password" onChange={handlePassword} />
                 
                    <h4 onClick={() => navigate('/login/forgot-password')} style={{ color: '#263238', cursor: 'pointer' }}>
                      Forgot Password?
                    </h4>
                 
                    <Button variant="contained" endIcon={<LoginIcon />} onClick={handleClick} ref={loginButtonRef}>
                      Login
                    </Button>
                  </Grid>
                </Grid>
                
              </Box>
            
            </Grid>
            
          </Grid>
          
        </Box>
        
      )}
    </Box>
  );
}

export default Login;
