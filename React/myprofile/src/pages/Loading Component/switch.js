import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';




const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function ColorSwitches() {

    const [isRotated, setIsRotated] = useState(false);
    const[checked,setChecked] = useState(false);


const navigate=useNavigate();

const handleClick=()=>{
    setChecked(!checked)
    setIsRotated(!isRotated);
    setTimeout(() => {
      navigate(isRotated ? '/login' : 'createProfile');
    }, 500);

}

  return (
    <div>
      <PinkSwitch {...label} onClick={handleClick} >
      <SwapHorizontalCircleIcon sx={{ transform: `rotate(${isRotated ? '180deg' : '0deg'})` }} />
      </PinkSwitch>
    </div>
  );
}