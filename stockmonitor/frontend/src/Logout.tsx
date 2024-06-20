import axios from 'axios';
import React , { useEffect , useState } from 'react';
import { Box ,Typography , TextField , Button} from '@mui/material';
import { LoginForm , Heading } from './stock';
import { useNavigate } from 'react-router-dom';
import api from './api.tsx';


const LogoutPage : React.FC = ()=> {
    const [heading,setHeading] = useState<Heading>({
        heading:"Log out",
    });
    let data = "log out";
    if(!(localStorage.getItem('authenticated')==='true')){
        setHeading({
            heading:"You must be logged in to log out",
        });
    }
    const navigate = useNavigate();
    const handleClick = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const logout = async ()=>{
            try{
                const response = await api.get("http://127.0.0.1:8000/stock/logout");
                data = response.data ;
                if(data["status"]==="user loggout out successfully"){
                    localStorage.removeItem('token')
                    console.log(data);
                    navigate('/');
                }else{
                    setHeading({
                        heading:"You must be logged in to log out",
                    });   
                    navigate('/login');      
                }
                
            }catch(err){
                setHeading({
                    heading:"You must be logged in to log out",
                });
                console.log("Error : ",err);
                navigate('/login');
            }
        }
        logout();
    }
    return (
    <div>
        <Box>
            <Typography variant="h3" sx={{margin:"25px 30vw"}}>{heading.heading}</Typography>
        </Box>
        <Box component="form" onSubmit={handleClick}>
        <Button type='submit' color="primary" variant="contained" sx={{margin:'10px 35vw'}}>{data}</Button>
        </Box>
    </div>);
}

export default LogoutPage;