import './App.css';  
import * as React from 'react';
import Profile from './pages/profile/profile'
import { Route,Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from './pages/login/login';
import CreateProfile from './pages/login/createProfile';

 function App() {
       return(
        
        <BrowserRouter>
        <Routes>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/login/createProfile' element={<CreateProfile/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        </BrowserRouter>

        );
 };
export default App;







