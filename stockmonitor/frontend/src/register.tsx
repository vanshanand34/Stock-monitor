import axios from 'axios';
import React , { useState } from 'react';
import { Box ,Typography , TextField , Button } from '@mui/material';
import { RegistrationForm } from './stock';
import { useNavigate } from 'react-router-dom';
import api from './api.tsx';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<RegistrationForm>({
        first_name: '',
        last_name: ' ',
        email: ' ',
        password: '',
        password2: '',
        username: ''
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
            const fetchdata = async ()=>{
                try{
                    console.log(formData)
                    const response = await api.post("http://127.0.0.1:8000/stock/register",formData);
                    const data = response.data ;
                    const code = response.status;
                    console.log(code);
                    console.log(data);
                    console.log("success : ",data);
                    // localStorage.setItem('token',data['token'])
                    navigate('/login');
                }catch(err){
                    console.log("Error : ",err);
                }
            }
            fetchdata();
        };
    return (
        <div>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Register
            </Typography>
            <TextField
                label="First Name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                sx={{ width: '45%', mb: 2 }}
            />
            <TextField
                label="User Name"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                sx={{ width: '45%', mb: 2 }}
            />
            <TextField
                label="Last Name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                sx={{ width: '45%', mb: 2 }}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ width: '45%', mb: 2 }}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ width: '45%', mb: 2 }}
            />
            <TextField
                label="Confirm Password"
                name="password2"
                type="password"
                value={formData.password2}
                onChange={handleChange}
                sx={{ width: '45%', mb: 2 }}
            />
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



export default RegisterPage;