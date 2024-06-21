import React from "react";
import { Navigate , useNavigate } from "react-router-dom";
import { Box , Typography , Button } from "@mui/material";



const LoginButton : React.FC = ()=> {
    const navigate = useNavigate();
    const navigateToLogin = (event : React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      navigate('/login');
    };
    if(localStorage.getItem('authenticated')==='false'){
      return(
        <Box>
        <Box display='flex' alignItems="center" justifyContent="center" margin="20vh 0">
          <Typography variant="h5" color="primary" >You MUST be logged in to view/create Wishlists</Typography>
        </Box>
          <Box component="form" onSubmit={navigateToLogin} display="flex" alignItems="center" justifyContent="center">
            <Button
              type = "submit"
              color = "primary"
              variant = "contained"
              name="Submit"
              sx={{}}>
              <Typography component="span" display="inline">Log In</Typography>
            </Button>
          </Box>
        </Box>);
    }else{
      return (<div></div>);
    }
  }

export default LoginButton;