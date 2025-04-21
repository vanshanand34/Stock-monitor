import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { LoginForm } from './stock';
import { useNavigate } from 'react-router-dom';
import api from './api.tsx';

const LoginPage: React.FC = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<LoginForm>({
        password: '',
        username: ''
    });
    const [error, setError] = useState("");


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await api.post("http://127.0.0.1:8000/stock/login", formData);
            const data = response.data;
            console.log(data);
            if (!data.status || !data['token']) {
                setError("Invalid username or password");
                localStorage.setItem('authenticated', 'false');
                return;
            }

            setError("");
            localStorage.setItem('token', data['token']);
            localStorage.setItem('authenticated', "true");
            navigate('/')

        } catch (err) {
            console.error("Error : ", err);
            setError(err);
        }
    };

    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {
                    error &&
                    <Box
                        paddingY={4}
                        paddingX={2}
                        display={'flex'}
                        justifyContent={'end'}
                        width={'90%'}
                    >
                        <Alert variant="filled" severity="error" onClose={() => setError("")} >
                            {error}
                        </Alert>
                    </Box>
                }
                <Typography variant="h3" sx={{ py: 10 }}>
                    Login
                </Typography>
                <Box>
                    <TextField
                        label="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    ></TextField>
                </Box>
                <Box paddingTop={10}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        name="Submit"
                        sx={{ width: '100%' }}
                        size='large'
                    >
                        <Typography component="span" display="inline">Submit</Typography>
                    </Button>
                </Box>
            </Box>

        </div>
    )

}



export default LoginPage;