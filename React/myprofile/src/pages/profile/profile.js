
import { Avatar, Box,Grid, Button, TextField,Fade, Backdrop, Drawer, Typography} from '@mui/material';
import './profile.css';  
import * as React from 'react';
import { useState, useEffect , useRef} from 'react';
import {Create, Key } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import axios from 'axios';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DrawerAppBar from '../../navbar/navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import UserDetails from './Details';
import Details from './Details';
import {  Modal } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { baseUrl } from '../../Server/MyAxios';
import { service } from '../../Services/Services';
import ReactApexChart from 'react-apexcharts';

export  const ApexChart = () => {
  const chartData = {
    series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
      }
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};


 function Profile() {

  // const token = sessionStorage.getItem("token")
  const [data2, setData2] = useState();
  const [data1, setData1] = useState();
  const [description, setDescription] = useState();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const aboutRef = useRef(null);
  const [scrollCount, setScrollCount] = useState(0);
  const [showAvatar, setShowAvatar] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(false); 


  const email=sessionStorage.getItem("id")
  const token = sessionStorage.getItem("token");

  const handleMouseEnter = () => {
    setHoveredItem(true);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(false);
  }

  const handleClick = async () => {
    try{
     await service.getAllDetails().then((response)=>{
 
      if (response.status === 200) {
        console.log(response.result);
        setData2(response.result);
        setVisible(!visible);
      } else if (response.status === 403) {
        console.error(response.data.message);
        setVisible(visible);
      }
  })
}
    catch(error){
  console.error(error);
    }
  };
  

  
    

     const handleClick1 = async () => {
      
     
      await service.getDescription().then((res)=>{
        console.log(res.result)
        if(res.status===200){
          setDescription(res.result)
          setVisible1(!visible1);
        }
        else{
         console.error(res.message)
  
        }
       
      }).catch((error)=>{
        console.error("Error data not found",error)
     
       })
    
     }
     const handleAboutSubmit =async(e)=>{
      e.preventDefault()
      try{
      await service.updateDescription(description).then((res)=>{
        console.log(res)
        if(res.status===200){
          Swal.fire({
            width: '400px',
            title: 'Updated Successfully',
            timer: '1000'
          });
        }
      })
      }
      catch(error){
        console.error(error)
      }
    }
    
     const fileInputRef = useRef(null);

const handleUploadButtonClick = () => {
  fileInputRef.current.click();
};

     const getPic=`${baseUrl}/getPic/${email}`
    
    const handleProfileChange = (file) => {
      let form =new FormData()  //for uploading mulitpart file 
      form.append("file",file.target.files[0]) 
   

    axios({ //it is used to call the service to conmplt the operation(upload)
      method: "put",
      url: `${baseUrl}/uploadPic/${email}`,
      data:form,
      headers: { "Content-Type": 'multipart/form-data' ,"Authorization" : 'Bearer ' + token},
    
    })
      .then((response) => {
        console.log(response.data);
        
        if(response.status===200){
          window.location.reload()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

    //  const scrollToAbout = () => {
    //    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    //  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =window.scrollY || document.documentElement.scrollTop;
      setScrollCount((scrollPosition) => scrollPosition + 1);
      if(scrollPosition === 0){
        setScrollCount(0)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollCount >= 14) {
      setShowAvatar(false);
    }
  else {
   setShowAvatar(true)
  }
  }, [scrollCount]);

 
  const [open, setOpen] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
    document.body.style.overflow = 'scroll';
}
  const handleModalClose = () => {setOpenModal(false);

  document.body.style.overflow = 'scro';
  }
const style = {
  transform: 'translate(0%,200%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  
 
    // position: 'fixed',
    // top: '300px',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // transition: 'smooth',
    // width: 400,
    // bgcolor: 'background.paper',
    // boxShadow: 24,
    // p: 4,
    // maxHeight: '90vh',
    // overflowY: 'hidden',
    // alignItems:'center',
    // justifyItems:'center'
};



useEffect(() => {
  checkTokenExpiration();
  return () => {
  };
}, []);

const navigate = useNavigate();
const checkTokenExpiration = () => {
  const token = sessionStorage.getItem('token');
if (token) {
  try {
    const decodedToken = jwt_decode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTimestamp) {
      Swal.fire({
        width: '400px',
        Icon:'error',
        title: 'Session exprired',
        text: 'Redirecting, please wait',
        timer: '1000'
      });
      navigate('/login');
    }
  } catch (error) {
    Swal.fire({
      width: '400px',
      Icon:'error',
      title: 'Something went wrong',
      text: 'Please wait',
      timer: '2000'
    });
  
    console.error('Failed to decode token:', error);
  }
} else {
   Swal.fire({
  width: '400px',
  Icon:'error',
  title: 'Something went wrong',
  text: 'Please wait',
  timer: '1000' 
});
 
  console.error('Token not found');
  navigate('/login');
}
};



  return (
  
    <div className="App" item={'true'} xs={12}
    sx={{ justifyContent:'center',
           justifyitems:'center',
           display:'flex',
           }}  >
             <DrawerAppBar aboutRef={aboutRef} />
             
           
      <header className="App-header">
            <img style={{position:'fixed'}} width='100%' height='100%' 
            src={require('./computer.jpg')} alt='deleted'> 
        </img>       
      </header>
     
      <Box className='div-cont'   sx={{ justifyContent:'center',
           backgroundColor:'blue',
           justifyitems:'center',
           display:'flex',
           felxDirection:'column' }}  >
      <Box width={'100%'} height={'90px'}
         sx={{ justifyContent:'center',
         boxShadow:3, 
        backgroundColor:'white',
         justifyitems:'center',
         display:'flex' }} >
         
            
           
        <Box className='div-cont2'
           sx={{
            boxShadow: 0, justifyContent:'center',
           justifyitems:'center',
           display:'flex' ,transition:'0.3s ease'}} >
              
      
          {showAvatar ? (
          <Avatar xs={12}  className='Avatar'
          style={{backgroundImage: `url(${getPic})`||'profile', width: '100px', height: '100px', }}
         >
          <form encType="multipart/form-data" >
         <input  type='file' className='my_file' onChange={handleProfileChange}  ref={fileInputRef}/>

           <CameraAltIcon style={{marginLeft:'45px', opacity: hoveredItem ? 1 : 0, transition:'1s'}}  
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave} 
           onClick={handleUploadButtonClick}
         >
           </CameraAltIcon>        
         </form>
        </Avatar> 
        
        ):(
        
         <p className='avatar-name'>Nikhil <br></br>
          <br></br></p> 
             )}
          
        
             
        </Box>
        </Box>
       
      </Box>
      

       <Box
      className="div-cont1"
      sx={{
        justifyContent: 'center',
        justifyItems: 'center',
        display: 'flex',
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4} >
          <Box
            className="dive"
            sx={{
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid >
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClick1}
                >
                  <h3>Who Am I ?</h3>
                </Button>
              </Grid>

              <Grid >
                <Grid
                  textalign="justify"
                  item
                  xs={12}
                  padding="25px"
                  sx={{ mt: 2 }}
                >
                  {visible1 && description}
                  <Button>
                    <Create
                      color="primary"
                      sx={{
                        cursor: 'pointer'
                      }}
                      onClick={handleModalOpen}
                    ></Create>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
           </Grid>
        
        <Grid item xs={12} sm={4}   ref={aboutRef}>
          <Box
            className="dive"
            sx={{
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          
          >
            <Grid container direction="column" alignItems="center">
              <Grid>
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClick}
                >
                  <h3>Profile</h3>
                </Button>
              </Grid>

              <Grid>
                <Grid textalign="justify" display="flex">
                  {visible &&
                    data2.map((item) => (
                      <Typography
                        style={{
                          fontFamily: 'initial',
                          fontStyle: 'oblique',
                          color: 'blueviolet',
                          fontSize: '20px'
                        }}
                      key={'index'}>
                       Name: {item.name}<br />
                        Email: {item.email} <br />
                        Contact No: {item.contactNo} <br />
                        Gender: {item.gender} <br />
                        DOB: {item.dateOfBirth}
                      </Typography>

                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box
            className="dive"
            sx={{
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid>
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClick}
                >
                  <h3>Experience</h3>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid> 
        </Grid>

    <Grid item xs={12} sx={{height:'50px',
    width:'100%',
         justifyContent:'flex-start',
        justifyitems:'', 
        display:'flex',paddingLeft:'' }}>
<h3 style={{color:'#d13459'}}>My Resume</h3>
    </Grid>    
   
<Grid container spacing={4}>
   <p style={{paddingLeft:'60px'}}></p>
        <Grid item xs={12} sm={3.5} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textalign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid >
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Education</h3>
      </Button>
      <div>
      <ApexChart/>  
      </div>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>


     <Grid item xs={12} sm={3.5} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textalign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid >
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Skills</h3>
      </Button>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>
    
    
    
    <Grid item xs={12} sm={3.5} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textalign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid>
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Languages</h3>
      </Button>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>
     </Grid>
     </Box>

   

    <Box className='footer'>
    <br></br><br />
     <footer >
     <br></br><br />  <br></br><br />
    <FacebookIcon/>&nbsp;
    <InstagramIcon/>&nbsp;
    <GoogleIcon/>&nbsp;
    <SubscriptionsIcon/>&nbsp;
    <ReportGmailerrorredIcon/>&nbsp;
    <TwitterIcon/>
    </footer> 
    </Box>
  
    <Modal   
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                isOpen={openModal}
                onClose={handleModalClose}
                closeAfterTransition>
                <Fade in={openModal}> 
                    <Box sx={{ 
                        display: 'flex',
                        position:'sticky',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Box sx={style}>
                            <form onSubmit={handleAboutSubmit}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="About Me"
                                    sx={{
                                        width: '100%',
                                        margin: '10px 0px'
                                    }} 
                                    defaultValue={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                               
                               
                               <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <Button   sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" >UPDATE</Button>

                        <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={handleModalClose} variant='contained' >Cancel</Button>
                    </Grid>
                            </form>
                        </Box>
                    </Box>
                  
                </Fade>
            </Modal>
      
            </div> 
  );
}

export default Profile;
