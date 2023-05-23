
import { Avatar, Box, Button, Grid, TextField, IconButton, Divider } from '@mui/material';
import './App.css';
import * as React from 'react';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material';


 function App() {

  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState('Initial Value');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform save logic here
    console.log('Field value:', fieldValue);
  };

  const handleInputChange = (event) => {
    setFieldValue(event.target.value);
  };

  const [showAvatar, setShowAvatar] = useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      setShowAvatar(scrollPosition === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="App" >
      <header className="App-header">
            
      <button  className='button2' >sign in </button> 
      <button className='my-button'>sign up</button>
     
        <img width='1500px' height={300} />
       
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          Learn React
      </header>
     
      <Box className={`div-cont,div1 ${showAvatar ? '' : 'avatar-disabled'}`}sx={{ boxShadow: 3 }}>
      <Button>Home</Button>
             <Button color="primary">About</Button>
             <Button color="secondary">Resume</Button>
             <Button disabled left='85%'>Disabled</Button>
             <Button href="#text-buttons" color="primary">Link</Button>  
        {showAvatar && (
          <Box >
          <Avatar alt="Remy Sharp" src="" className='Avatar' /> 
          </Box>
        )}
        {!showAvatar && (
          <Box className='avatar-name'>
          Nikhil <br></br>
          Developer
          </Box>
        )}
     
            
      </Box>
      <Box className='div-cont'>
     <Box className='div'sx={{ boxShadow: 3 }}>
   
      <Grid>
          {isEditing ? (
        <>
          <TextField
            value={fieldValue}
            onChange={handleInputChange}
            autoFocus
          />
          <IconButton onClick={handleSaveClick}>
            <SaveIcon />
          </IconButton>
        </>
      ) : (
        <>
          <span>{fieldValue}</span>
          <IconButton onClick={handleEditClick}>
            
          </IconButton>
        </>
      )}
        {/* <TextField label="Description" required multiline rows={12} placeholder="Description"   style={{width:"300px",marginTop:""}} ></TextField> */}
      </Grid> 
     </Box>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <Divider orientation="vertical" flexItem></Divider>
     <Box className='div2'sx={{ boxShadow: 3 }}>
        <Button className='button3'>Profile</Button>
     </Box >
     </Box>
     <Box className='div'>

     </Box>
    </div>
  
  );
}

export default App;
