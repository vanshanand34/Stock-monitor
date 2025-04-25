import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";


const LoginButton: React.FC = () => {
  const navigate = useNavigate();
  const navigateToLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/login');
  };
  if (localStorage.getItem('authenticated') === 'false') {
    return (
      <Box>
        <Box display='flex' alignItems="center" justifyContent="center" margin="20vh 0">
          <Typography variant="h5" color="primary" >You must be logged in to view/create Wishlists</Typography>
        </Box>
        <Box component="form" onSubmit={navigateToLogin} display="flex" alignItems="center" justifyContent="center">
          <Button
            type="submit"
            color="primary"
            title="Logout"
            variant="contained"
            name="Submit"
            sx={{}}>
            <Typography component="span" display="inline">Log In</Typography>
          </Button>
        </Box>
      </Box>);
  } else {
    const message = localStorage.getItem("message")
    if (message != "") {
      return (
        <Box display='flex' alignItems="center" justifyContent="center" margin="20vh 0">
          <Typography variant="h5" color="primary" >{message}</Typography>
        </Box>
      );
    } else {
      return (<></>);
    }
  }
}

export default LoginButton;