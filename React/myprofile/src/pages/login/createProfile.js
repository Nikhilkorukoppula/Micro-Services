import { Grid, TextField,Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateProfile(){
    const navigate= useNavigate();
    const[name,setName]=useState('');
    const[gender,setGender]=useState('');
    const[email,setEmail]=useState('');
    const[dob,setDob]=useState(dayjs().format("YYYY-MM-DD"));
    const[contactNo,setContactNo]=useState('');
    const[address,setAddress]=useState('');
    const[password,setPassword]=useState('');


    const handleGoBack = () =>{
        navigate(-1);
      };

    const handleSubmit = async(e)=>{
        e.preventDefault()
      await axios.post(`http://localhost:8085/api/V1/myprofile/add`,{
        "name":name,
        "gender":gender,
        "email":email,
        "dateOfBirth":dob,
        "contactNo":contactNo,
        "address":address,
        "password":password

    }).then((res=>{
         console.log(res)
      if(res.status===200){  
        Swal.fire({ width:"400px",
        title: "Details Submitted",
        text: "Account Created",
       });
        console.log("submitted")
      }
      })) 

    }


    return (
    <Grid style={{width:'100',backgroundColor:'whitesmoke',height:'100vh',
                 justifyContent:'center',
                 justifyItems:'center',
                 display:'flex'}} xs item={12}>
             
              <Grid style={{justifyContent:'center', justifyItems:'center',
                            alignItems:'center',marginTop:'100px',height:'500px',width:'500px',textAlign:'center'}}
                            sx={{boxShadow:'10',borderRadius:'10px'}}>
              <h2>Profile Details</h2>
              <TextField  value={name} onChange={(e)=>{setName(e.target.value)}} label="FirstName" variant="standard" type="text" /><br/>
              <TextField  value={gender} onChange={(e)=>{setGender(e.target.value)}} label="gender" variant="standard" type="text" /><br/>
              <TextField  value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email" variant="standard" type="email" /><br/><br/>
              <TextField  value={dob} onChange={(e)=>{setDob(e.target.value)}} style={{width:'200px'}} variant="standard" type="date"/><br/>
              <TextField  value={contactNo} onChange={(e)=>{setContactNo(e.target.value)}} label="ContactNo" variant="standard" type="number" /><br/>
              <TextField  value={address} onChange={(e)=>{setAddress(e.target.value)}} rows={'5'} label="Address" variant="standard" type="text"/><br/>
              <TextField  value={password} onChange={(e)=>{setPassword(e.target.value)}}label="Password" variant="standard" type="password"/><br/><br/>
              <Button style={{backgroundColor:'dodgerblue',color:'white'}} onClick={handleSubmit}>Submit</Button>
              </Grid>
              <Button style={{backgroundColor:'dodgerblue',color:'white',height:'30px',marginTop:'50px'}} onClick={handleGoBack}>Back</Button>
            
    </Grid>
    );

};
export default CreateProfile