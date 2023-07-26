import React from 'react';
import {Route, BrowserRouter,Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CandidateProfile from './components/CandidateProfile';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css'; 
function App() {
  return (
    <BrowserRouter> 
     <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={CandidateProfile} />
          <Route component={NotFound} />
          </Routes>
    </BrowserRouter>
  )
}

export default App;
