import './App.css';  
import * as React from 'react';
import Profile from './pages/profile/profile'
import { Route,Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Homepage from './pages/homepage/homepage';

 function App() {
       return(
        <BrowserRouter>
        <Routes>
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/homepage/profile' element={<Profile/>}/>
        </Routes>
        </BrowserRouter>

        );
 };
export default App;







