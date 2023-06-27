
import { Avatar, Box,Grid, Button, TextField} from '@mui/material';
import './profile.css';  
import * as React from 'react';
import { useState, useEffect , useRef} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';


 function Profile() {

 
  const [data2, setData2] = useState();
  const [data1, setData1] = useState();
  const [editedData, setEditedData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const aboutRef = useRef(null);
  const [scrollCount, setScrollCount] = useState(0);
  const [showAvatar, setShowAvatar] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleClick = async () => {
   
    
      await axios.get('http://192.168.2.96:8085/api/V1/myprofile/getAll').then((res)=>{
        console.log(res.data.result)
        if(res.status===200){
          setData2(res.data.result)
          setVisible(!visible);
        }
        else{
         console.error(res.message)
  
        }
       
      }).catch((error)=>{
        console.error("Error data not found",error)
     
       })
    
     }
  
     const handleClick1 = async () => {
      await axios.get('http://192.168.2.96:8085/api/V1/myprofile/getAll').then((res)=>{
        console.log(res.data.result)
        if(res.status===200){
          setData1(res.data.result)
          setVisible1(!visible1);
        }
        else{
         console.error(res.message)
  
        }
       
      }).catch((error)=>{
        console.error("Error data not found",error)
     
       })
    
     }

     const handleInputChange = (e, item) => {
      const updatedData = {editedData, [item.id]: e.target.value };
      setEditedData(updatedData);
    };
  
    const handleEdit = (item) => {
      setEditMode(true);
      setEditedData({editedData, [item.id]: item.description });
    };
  

    const handleUpdate = (item) => {
      //Perform the update request to the backend using editedData
      //Example:
      const queryParams = `name=${item.name}&description=${editedData[item.id]}`;
      axios.put(`http://192.168.2.96:8085/api/V1/myprofile/update?${queryParams}`)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
        console.error("error")
        });
  
      setEditMode(false);
    

    setTimeout(() => {
      // Update the data1 state with the new description value
      setData1((prevData) => {
        return prevData.map((dataItem) => {
          if (dataItem.id === item.id) {
            return { ...dataItem, description: editedData[item.id] };
          }
          return dataItem;
        });
      });
    });
  };

    const handleItemMouseEnter = (item) => {
      setHoveredItem(item);
    };
  
    const handleItemMouseLeave = () => {
      setHoveredItem(null);
    };

     const scrollToAbout = () => {
       aboutRef.current.scrollIntoView({ behavior: 'smooth' });
     };

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


  return (
  
    
    <div className="App"  item xs={12}
    sx={{ justifyContent:'center',
           justifyitems:'center',
           display:'flex' }}  >
      <header className="App-header">
            <img style={{position:'fixed'}} width='100%' height='100%' 
            src={require('./computer.jpg')}>
        </img>       
        <div className='fixed'
      sx={{ justifyContent:'center',
      justifyitems:'center',
      display:'flex' }}  item xs={12}>
             <Button style={{color:'black'}}>Home</Button>
             <Button color="primary" onClick={scrollToAbout}>About</Button>
             <Button color="secondary">Resume</Button>
             <Button >LogOut</Button>
      </div>
      </header>
      <Box className='div-cont'   sx={{ justifyContent:'center',
           justifyitems:'center',
           display:'flex' }}  item xs={12}>
      <Box width={'100%'} bgcolor={'bisque'} height={'90px'} item xs={12}
         sx={{ justifyContent:'center',
         justifyitems:'center',
         display:'flex' }} >
         
            
           
        <Box className='div-cont2' item xs={12}
           sx={{
            boxShadow: 10, justifyContent:'center',
           justifyitems:'center',
           display:'flex' }} >
              
      
          {showAvatar && (
          <Avatar  className='Avatar'  style={{ width: '100px', height: '100px' }} alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtPwScKQmgy9AjFzs-UtTegpOjcDe02u5Yrw&usqp=CAU"/> 
         
        )}
        {!showAvatar && (
        
         <p className='avatar-name'>Nikhil <br></br>
          <br></br></p> 
             )}
          
             
             
        </Box>
        </Box>
      </Box>

      <Box className='div-cont1' item xs={12}
       sx={{ justifyContent:'center',
       justifyitems:'center',
       display:'flex' }} >
       <Box className='dive' sx={{ boxShadow: 3,
         justifyContent:'center',
        justifyitems:'center',
        display:'flex'  }} item xs={12}>

       <Grid  textAlign={'center'} item xs={12}> 
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}
       onClick={handleClick1}  items xs={12}  ><h3  >Who Am I ?</h3>
      </Button>
     

      <Grid  textAlign={'justify'} item xs={12}>
      {visible1 &&data1.map((item) => (
             <h3>{item.description}</h3>
        
          ))}
          </Grid>
        </Grid>
      </Box>&nbsp;&nbsp;
 
 
      <Box className='dive' sx={{ boxShadow: 3,
         justifyContent:'center',
        justifyitems:'center',
        display:'flex'  }} item xs={12} ref={aboutRef}>

       <Grid textAlign={'center'} item xs={12}> 
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}
       onClick={handleClick}  item xs={12}  ><h3 item xs={12}   >Profile</h3>
      </Button>
   
        <Grid  textAlign={'justify'} item xs={12}>
            {visible &&data2.map((item) => (
                 <h4>Name: {item.name} <br />
                Email: {item.email} <br />
                 Contact No: {item.contactNo} <br />
                 Age: {item.age} <br />
                 DOB: {item.dateOfBirth}</h4>
            ))}
               </Grid>
        </Grid>
    
     </Box > &nbsp;&nbsp;
    
     <Box className='dive' sx={{ boxShadow: 3,
         justifyContent:'center',
        justifyitems:'center',
        display:'flex'  }} item xs={12}>

       <div  textAlign={'center'} item xs={12}> 
      <Button className='button3' style={{marginTop:"20px",height:"50px"}}
       onClick={handleClick}  item xs={12}  ><h3 item xs={12}  display={'flex'} >Experience</h3>
      </Button>
      </div>
     </Box >
     </Box>

     <Box className="div-cont1" item xs={12} sx={{ 
         justifyContent:'center',
        justifyitems:'center',
        display:'flex'  }}>
     <Box className='div4' sx={{boxShadow: 3,
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }} item xs={12} >
         <div textAlign={'center'}>
      <Button className='button3' style={{marginTop:"20px",height:"50px"}} item xs={12}>
        <h3>Education</h3>
      </Button>
      </div>
     </Box> &nbsp;&nbsp;&nbsp;

     <Box className='div4' sx={{boxShadow: 3,
         justifyContent:'center',
        justifyitems:'center',
        display:'flex' }} item xs={12} >
         <div textAlign={'center'}>
      <Button className='button3' style={{marginTop:"20px",height:"50px"}} item xs={12}>
        <h3>Skill</h3>
      </Button>
      </div>
     </Box>
    
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
  
    </div>

  );
}

export default Profile;
