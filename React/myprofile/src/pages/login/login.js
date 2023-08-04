import * as React from 'react';
import './login.css';
import { Box, Grid, Button, TextField, useMediaQuery, Typography } from '@mui/material';
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

  useEffect(()=>{
   // window.location.reload()
  },[]);

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
      console.log(error)
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
            <Grid sx={{ justifyContent: 'center', display: 'flex',width:'400px',height:'30px',marginTop:'50px' }}>
            <Typography style={{fontFamily:'Segoe Script', fontSize:'30px'}}>Login</Typography> 
            </Grid> 
                <Grid container spacing={0} direction={isMobile ? 'column' : 'row'}  style={{ justifyContent: 'center',alignItems:'center', display:'flex', width:'200px', marginTop:'70px',justifyItems:'center'}}>
                
                  <Grid item xs={12} md={isMobile ? 12 : 6}>
                    <TextField id="email"  label="Email" variant="filled" type="email" onChange={handleEmail} style={{width:'250px',marginLeft:'30px'}} />
                  
                    <TextField id="password" label="Password" variant="filled" type="password" onChange={handlePassword} style={{width:'250px',marginLeft:'30px'}}/>
                  
                <Grid style={{justifyContent:'flex-end',display:'flex',width:'280px'}}>
                    <Typography onClick={() => navigate('/login/forgot-password')} style={{ color: '#263238', cursor: 'pointer',display:'flex', fontFamily:'Times New Roman', fontSize:'17px' }}>
                      Forgot Password
                    </Typography>  
                    </Grid><br></br>
                    <Grid  style={{justifyContent:'center',display:'flex',width:'280px'}}>
                    <Button style={{borderRadius:'20px'}}variant="contained" endIcon={<LoginIcon />} onClick={handleClick} ref={loginButtonRef}>
                      Login 
                    </Button>
                    </Grid ><br></br>
                    <Grid style={{justifyContent:'flex-start',display:'flex',width:'280px',borderTopStyle:'ridge'}} sx={{transition: 'transform 0.5s ease',
                                                transform: `rotateY(${isRotated ? '180deg' : '0deg'})`}}>
                   <Typography style={{fontSize:'16px',marginTop:'18px'}}>Click for Signup</Typography>&nbsp; <p> 👉</p> &nbsp;&nbsp;&nbsp; 
                  <Grid style={{display:'flex', marginTop:'12px'}}><ColorSwitches/></Grid>
                    </Grid>
                    </Grid> 
                   
                </Grid>
                
             {/* </Box> */}
            
            </Grid>
            
          </Grid>
          
        </Box>
        
      )}
    </Box>
  );
}

export default Login;
