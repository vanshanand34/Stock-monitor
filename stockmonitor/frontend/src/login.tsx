import axios from 'axios';
import React , { useEffect , useState } from 'react';
import { Box ,Typography , TextField , Button} from '@mui/material';
import { LoginForm } from './stock';
import { useNavigate } from 'react-router-dom';
import api from './api.tsx';

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<LoginForm>({
        password: '',
        username: ''
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
            const fetchdata = async ()=>{
                try{
                    const response = await api.post("http://127.0.0.1:8000/stock/login",formData);
                    const data = response.data ;
                    console.log(data);
                    if(data['token']){
                        localStorage.setItem('token',data['token']);
                        localStorage.setItem('authenticated',"true");
                        navigate('/')
                    }else{
                        navigate('/login')
                    }
                }catch(err){
                    console.log("Error : ",err);
                }
            }
            fetchdata();
        };
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Login
            </Typography>
            <TextField
                label="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                sx={{ width: '100%', mb: 2 }}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                ></TextField>
            <Button
            type = "submit"
            color = "primary"
            variant = "contained"
            name="Submit"
            sx={{ width:'15%' ,mb:2}}>
            <Typography component="span" display="inline">Submit</Typography>
            </Button>
            </Box>
            </div>
    )
    
}



export default LoginPage;