import * as React from 'react';
import './login.css';
import { Box,Grid, Button, TextField} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect , useRef} from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';


function Login(){

  const navigate= useNavigate();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const[isLoading,setIsloading]=useState(false);
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
      setIsloading(true)
       // const queryParams= `email=${email}&password=${password}`;
        await axios.post(`http://localhost:8085/api/V1/myprofile/login`,{
          "email":email,
          "password":password
        }).then((res)=>{
            console.log(res)
            if(res.status===200){
              sessionStorage.setItem("token",res.data.Token)
              sessionStorage.setItem("id",email)
          setIsloading(false)
            Swal.fire({ width:"400px",
		                  title: "Login Success",
	                  	text: "redirecting please wait",
                      timer:"1000",
	                   });
          navigate('/profile')
            }
            else if(res.status===404){
              setIsloading(false)
              Swal.fire({ width:"400px",
              title: "Login Failure",
              text: "",
              timer:"1000",
             });
                console.error(res.data)
                 navigate('/login')
              
            }
        }).catch(error => {
          setIsloading(false)
          Swal.fire({ width:"400px",
              title: "Login Failure",
              text: "Username or Password invalid",
             
             });

      })

    }

    const handleEmail =(e)=>{
    setEmail(e.target.value)
    }
    const handlePassword =(e)=>{
        setPassword(e.target.value)
        }

       
          const [isOpen, setIsOpen] = useState(false);
        
          const toggleModal = () => {
            setIsOpen(!isOpen);
          };


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
                                                justifyitems:'center'}}>
                                <h2>Login</h2>
                                <h4>Don't you have Account.? 
            <Link to='createProfile' style={{fontFamily:'arial',fontStyle:'oblique'}}>Click here</Link>
            </h4> 
                                <TextField id="filled-basic" label="Email" variant="filled" type="email" onChange={handleEmail}/> <br></br>
                                <TextField id="filled-basic" label="Password" variant="filled" type="password" onChange={handlePassword} /><br></br><br></br>
                                <Grid textAlign={'justify'}>
                                <h4 onClick={()=>{navigate("/login/forgot-password")}} style={{ color:"#263238",marginLeft: "170px", marginTop: "5px" ,cursor:"pointer"}}>Forgot Password?</h4>
                                <Button variant="contained" endIcon={<LoginIcon />} onClick={handleClick} ref={loginButtonRef} style={{marginLeft:'90px'}}>
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