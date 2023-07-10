import { Grid, TextField,Button } from "@mui/material";
import React, { useState } from "react";
import { BeatLoader} from 'react-spinners';

import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
 
function ForgotPassword() {
    const [email,setEmail]=useState('');
    const[isLoading,setIsloading]=useState(false)

    const handleClick =async (e)=>{
     e.preventDefault()
     setIsloading(true)
     console.log(email)
        await axios.post('http://localhost:8085/api/V1/myprofile/forgot-mail',{
            "email":email
        }).then((res)=>{
            setIsloading(false)
            console.log(res)
            if(res.data.status===200){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else{
                toast("mail not sent")
            }
        })

    }

    return(
           isLoading?<BeatLoader color="#36d7b7" style={{justifyContent:'cenetr'}}/>:<div style={{justifyItems:'center',
                        justifyContent:'center',
                        alignItems:'cenetr', 
                        alignContent:'center',
                        height:'100vh',display:'flex'}} xs item={12}>
                             
             <Grid style={{justifyContent:'center', justifyItems:'center',
                            alignItems:'center',marginTop:'100px',height:'300px',width:'500px',textAlign:'center'}}
                            sx={{boxShadow:'1',borderRadius:'10px'}}>
           <h2>Forgot-password</h2>
            <TextField label="Email" style={{width:'300px'}}  onChange={(event)=>{setEmail(event.target.value)}}/><br></br><br></br>
            <Button variant="contained" onClick={handleClick}>
                       Send
                </Button> 
            </Grid>
          
           </div>
    );

}
export default ForgotPassword;