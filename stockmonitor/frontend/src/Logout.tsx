import axios from 'axios';
import React , { useEffect , useState } from 'react';
import { Box ,Typography , TextField , Button} from '@mui/material';
import { LoginForm } from './stock';
import { useNavigate } from 'react-router-dom';
import api from './api.tsx';
import LoginButton from './LoginButton.tsx';

const LogoutPage : React.FC = ()=> {
    const navigate = useNavigate();
    const handleClick = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const logout = async ()=>{
            try{
                const response = await api.get("http://127.0.0.1:8000/stock/logout");
                const data = response.data ;
                if(data["status"]==="user loggout out successfully"){
                    localStorage.removeItem('token');
                    navigate('/login');
                    localStorage.setItem("authenticated","false");
                    console.log(data);
                }else{
                    navigate('/login');      
                }
                
            }catch(err){
                console.log("Error : ",err);
                navigate('/login');
            }
        }
        logout();
    }
    if(localStorage.getItem('authenticated')==='false'){
        return (<></>);
        // <Box display='flex' alignItems="center" justifyContent="center" sx={{margin:'12px 22px 44px'}}>
        //     <Typography variant="h3">You must be Logged in to log out</Typography>
        // </Box>);
    }else{
        return (
        <Box>
            {/* <Box display='flex' alignItems="center" justifyContent="center" sx={{margin:'12px 22px 44px'}}>
                <Typography variant="h3">Logout</Typography>
            </Box> */}
            <Box component="form" onSubmit={handleClick} display='flex' alignItems="center" justifyContent="center">
                <Button type='submit' color="primary" variant="contained">Logout</Button>
            </Box>
        </Box>);
    }
}

export default LogoutPage;