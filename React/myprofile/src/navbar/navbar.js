import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';



const drawerWidth = 240;
const navItems = ['Home', 'Contact', 'About','Logout'];


function DrawerAppBar(props) {

  const navigate = useNavigate()

    const {aboutRef} = props
    const handleLinkClick = (section) => {
      if(section==='Logout'){
        Swal.fire({
          icon: "warning",
          iconColor:"#d50000",
          title: 'Do you want to Leave?',
          showCancelButton: true,
          confirmButtonColor: '#2196F3',
          confirmButtonText:'yes',
          cancelButtonColor: '#d50000'
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.clear()
           
            Swal.fire({ 
              position: 'center',
              icon: 'success',
              title: 'Logout successfully completed ! Redirecting to Login page...',
              showConfirmButton: false,
              timer: 1500
            })
           
          navigate('/login');
          } 
        })
       
      }
      
      else if(section==='About'){
      scrollToAbout();
      return;
      }
      else if(section==='Home'){
        return
      }
      else if(section==='Contact'){
        return
      }
      handleDrawerToggle();
    };

    useEffect(()=>{
    //  window.location.reload()
    },[])
    
    const scrollToAbout = () => {
      if (aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    // const scrollToAbout =(section) => {
      
    //     console.log(section)
    //         if (section === 'About' && aboutRef.current) {
               
    //           aboutRef.current.scrollIntoView({ behavior: 'smooth' });
             
    //         }
          
    //       };
  
    
        

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor:'#4694fa' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding sx={{ justifyContent: 'center' }} >
            <Button  sx={{ color: 'black' }} onClick={() => handleLinkClick(item)}>
              <ListItemText primary={item} />
            </Button>
          </ListItem>  
           
        ))}
          
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
           
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MyProfile
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
             <Button key={item} sx={{ color: '#fff' }} onClick={() => handleLinkClick(item)}>
             {item}
           </Button>
            
           ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth ,overflowY: 'auto'},
          }}
        >
          {drawer} 
        </Drawer> 
      </Box>
     </Box>
  );
}

DrawerAppBar.propTypes = {

  window: PropTypes.func,
};

export default DrawerAppBar;