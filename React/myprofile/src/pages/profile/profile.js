
import { Avatar, Box,Grid, Button, TextField,Fade, Backdrop, Drawer} from '@mui/material';
import './profile.css';  
import * as React from 'react';
import { useState, useEffect , useRef} from 'react';
import {Create } from '@mui/icons-material';
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
import { Modal } from 'reactstrap';

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
  const handleMouseEnter = () => {
    setHoveredItem(true);
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(false);
  }
  const interceptor = (request) => { 
    const token = sessionStorage.getItem("token");
   
    if (!token) {
      throw new Error("JWT token not found");
    }
   
    request.headers.Authorization= `Bearer ${token}`;
   
    return request;
  };

    const jwt=axios.interceptors.request.use(interceptor); 
 


  const handleClick = async () => {
    try{
     await axios.get(`http://10.0.0.24:8085/api/V1/myprofile/getAll/${email}`,jwt).then((response)=>{
 
      if (response.status === 200) {
        console.log(response.data.result);
        setData2(response.data.result);
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
      
     
      await axios.get(`http://10.0.0.24:8085/api/V1/myprofile/getDesc/${email}`,jwt).then((res)=>{
        console.log(res.data.result)
        if(res.status===200){
          setDescription(res.data.result)
           console.log(description)
          setVisible1(!visible1);
        }
        else{
         console.error(res.message)
  
        }
       
      }).catch((error)=>{
        console.error("Error data not found",error)
     
       })
    
     }
    
    
     const fileInputRef = useRef(null);

const handleUploadButtonClick = () => {
  fileInputRef.current.click();
};

     const getPic=('http://10.0.0.24:8085/api/V1/myprofile/getPic/nikhil',jwt)
    
    const handleProfileChange = (file) => {
      let form =new FormData()  //for uploading mulitpart file 
      form.append("file",file.target.files[0]) 
   

    axios({ //it is used to call the service to conmplt the operation(upload)
      method: "put",
      url: `http://10.0.0.24:8085/api/V1/myprofile/uploadPic/nikhil?`,
      data: form,
      headers: { "Content-Type": 'multipart/form-data'},
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

  const handleAboutSubmit =async()=>{
    await axios.put(`http://10.0.0.24:8085/api/V1/myprofile/update/${email}`,{
      "description":description,
      jwt
    })
  }
  const [open, setOpen] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  useEffect(() => {
}, [openModal,open]);

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -200%)',
  transition:'smooth',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
  return (
  
    
    <div className="App"  item xs={12}
    sx={{ justifyContent:'center',
           justifyitems:'center',
           display:'flex' }}  >
             <DrawerAppBar aboutRef={aboutRef} />
             
           
      <header className="App-header">
            <img style={{position:'fixed'}} width='100%' height='100%' 
            src={require('./computer.jpg')} alt='deleted'> 
        </img>       
      </header>
     
      <Box className='div-cont'   sx={{ justifyContent:'center',
           justifyitems:'center',
           display:'flex',
           felxDirection:'column' }}  >
      <Box width={'100%'} bgcolor={'white'} height={'90px'}
         sx={{ justifyContent:'center',
         justifyitems:'center',
         display:'flex' }} >
         
            
           
        <Box className='div-cont2'
           sx={{
            boxShadow: 10, justifyContent:'center',
           justifyitems:'center',
           display:'flex' ,transition:'opacity 0.5s'}} >
              
      
          {showAvatar && (
          <Avatar item  xs={12}  className='Avatar'
          sx={{transition:'opacity 1s'}}
          style={{backgroundImage:`url(${getPic})`, width: '100px', height: '100px'}}
         >
          <form enctype="multipart/form-data" >
         <input  type='file' className='my_file' onChange={handleProfileChange}  ref={fileInputRef}/>

           <CameraAltIcon style={{marginLeft:'45px', opacity: hoveredItem ? 1 : 0, transition:'1s'}}  
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave} 
           onClick={handleUploadButtonClick}
         >
          
           </CameraAltIcon>

        
         </form>
        </Avatar> 
        
        )}
         
        {!showAvatar && (
        
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            className="dive"
            sx={{
              boxShadow: 3,
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClick1}
                >
                  <h3>Who Am I ?</h3>
                </Button>
              </Grid>

              <Grid item>
                <Grid
                  textAlign="justify"
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
              boxShadow: 3,
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Button
                  className="button3"
                  style={{ marginTop: '20px', height: '50px' }}
                  onClick={handleClick}
                >
                  <h3>Profile</h3>
                </Button>
              </Grid>

              <Grid item>
                <Grid textAlign="justify" display="flex">
                  {visible &&
                    data2.map((item) => (
                      <h4
                        style={{
                          fontFamily: 'initial',
                          fontStyle: 'oblique',
                          color: 'darkcyan',
                          fontSize: '20px'
                        }}
                      >
                        Name: {item.name} <br />
                        Email: {item.email} <br />
                        Contact No: {item.contactNo} <br />
                        Gender: {item.gender} <br />
                        DOB: {item.dateOfBirth}
                      </h4>
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
              boxShadow: 3,
              justifyContent: 'center',
              justifyItems: 'center',
              display: 'flex',
            }}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
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
     
     
<p style={{paddingLeft:'200px'}}></p>     
          
        <Grid item xs={12} sm={4} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{boxShadow: 3,
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textAlign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid item>
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Education</h3>
      </Button>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>


     <Grid item xs={12} sm={4} sx={{
         justifyContent:'center',
        justifyitems:'center',
        display:'flex', }}>
     <Box className='div4' sx={{boxShadow: 3,
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }}>
         <div textAlign={'center'}>
         <Grid container direction="column" alignItems="center">
              <Grid item>
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}>
        <h3>Skills</h3>
      </Button>
      </Grid>
      </Grid>
      </div>
     </Box>
     </Grid>
    </Grid>
    </Box>
     {/* </Box> */}
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
                closeAfterTransition
                  
              
            >
                <Fade in={openModal}>
                    <Box sx={{
                        display: 'flex',
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
