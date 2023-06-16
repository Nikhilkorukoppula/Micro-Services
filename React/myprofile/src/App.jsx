
import { Avatar, Box, Button, TextField} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import './App.css';
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

 function App() {

 
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
   
    
      await axios.get('http://192.168.2.111:8085/api/V1/myprofile/getAll').then((res)=>{
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
      await axios.get('http://192.168.2.111:8085/api/V1/myprofile/getAll').then((res)=>{
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
      axios.put(`http://192.168.2.111:8085/api/V1/myprofile/update?${queryParams}`)
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



  

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  //     setShowAvatar(scrollPosition === 0);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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
  
    
    <div className="App" >
      <header className="App-header">
            <img style={{position:'fixed'}} width='100%' height='100%' src='data:image/jpeg;base64,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'>
        </img>       
        <div
        style={{
          position: 'absolute',
          marginTop:'20px',
          marginLeft:'50px',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          padding: '10px',
        }}
      >
        <h2>Hello</h2>
      </div>
      </header>
     
      <Box className='div-cont' sx={{ boxShadow: 10 }}  border={1} borderColor={'lightgrey'} >
      <Button style={{color:'black'}}>Home</Button>
             <Button color="primary" onClick={scrollToAbout}>About</Button>
             <Button color="secondary">Resume</Button>
             <Button >LogOut</Button>
             <Button href="#text-buttons" color="primary">Link</Button>  
      
          <Box className='avatar-div' style={{  height: '50px', marginBottom:"10px"}}>
          {showAvatar && (
          <Avatar  className='Avatar'  style={{ width: '100px', height: '100px' }} alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtPwScKQmgy9AjFzs-UtTegpOjcDe02u5Yrw&usqp=CAU"/> 
         
        )}
        {!showAvatar && (
        
         <p className='avatar-name' >Nikhil <br></br>
          <br></br></p> 
             )}  
        </Box>
         
      </Box>

      <Box className='div-cont' >
       <Box className='dive' sx={{ boxShadow: 3 }}>
       <div style={{marginLeft:"100px"}}>
      <Button className='button3' style={{width:"150px",textAlign:"center",marginTop:"20px",height:"50px"}}
       onClick={handleClick1} ><h3>Who Am I ?</h3>
      </Button>
      </div>
      <div style={{marginLeft:"30px",height:"100px"}} >
      {visible1 &&data1.map((item) => (
         <div
         key={item.id}
         onMouseEnter={() => handleItemMouseEnter(item)}
         onMouseLeave={handleItemMouseLeave}
       >
         <h4>
           {editMode && hoveredItem && hoveredItem.id === item.id ? (
            
             <TextField id="standard-basic" variant="standard"maxRows={5}  value={editedData[item.id]} onChange={(e) => handleInputChange(e, item)} />
           ) : (
             <span>{item.description}</span>
           )}
           {!editMode && hoveredItem && hoveredItem.id === item.id && (
             <span  className='editIcon' onClick={() => handleEdit(item)}>
               <CreateIcon ></CreateIcon>
             </span>
           )}
           {editMode && hoveredItem && hoveredItem.id === item.id && (
             <span  onClick={() => handleUpdate(item)}>
               <CheckIcon ></CheckIcon>
             </span>
             
           )}
           
           </h4>  
           </div>
          ))}
        </div>
      </Box>&nbsp;&nbsp;
 
 
     <Box className='dive'sx={{ boxShadow: 3 }} ref={aboutRef}>
      <div style={{marginLeft:"100px"}}>
      <Button  className='button3' style={{width:"100px",textAlign:"center",marginTop:"20px",height:"50px"}}
        onClick={handleClick}><h3>Profile</h3>
      </Button>
      </div>
        <div style={{marginLeft:"30px",height:"100px"}} >
            {visible &&data2.map((item) => (
                 <h4>Name: {item.name} <br />
                Email: {item.email} <br />
                 Contact No: {item.contactNo} <br />
                 Age: {item.age} <br />
                 DOB: {item.dateOfBirth}</h4>
            ))}
        </div>
    
     </Box > &nbsp;&nbsp;
    
     <Box className='dive'sx={{ boxShadow: 3 }}  border={1} borderColor={'lightgrey'}>
     <div style={{marginLeft:"100px"}}>
      <Button className='button3' style={{width:"150px",textAlign:"center",marginTop:"20px",height:"50px"}} >
        <h3>Experience</h3>
      </Button>
      </div>
     </Box >
     </Box>

     <Box className="div-cont">
     <Box className='div4' sx={{ boxShadow: 3 }}>
         <div style={{marginLeft:"100px"}}>
      <Button className='button3' style={{width:"100px",textAlign:"center",marginTop:"20px",height:"50px"}} >
        <h3>Education</h3>
      </Button>
      </div>
     </Box>

     <Box className='div5' sx={{ boxShadow: 3 }} border={1} borderColor={'lightgrey'}>
           <div style={{marginLeft:"100px"}}>
      <Button className='button3' style={{width:"100px",textAlign:"center",marginTop:"20px",height:"50px"}} >
        <h3>Skills</h3>
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

export default App;
