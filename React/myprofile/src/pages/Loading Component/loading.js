import { Box } from "@mui/material";
import React from "react";
import './loading.css';
import { Container, Modal } from "reactstrap";

function Loading (){
 
   
    return(
<div class="wrapper">
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="shadow"></div>
<div class="shadow"></div>
<div class="shadow"></div> 
<span style={{color:'red'}}>Loading</span>
</div>
    )
} 

export default Loading
