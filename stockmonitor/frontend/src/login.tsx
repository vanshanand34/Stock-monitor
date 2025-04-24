import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Card } from '@mui/material';
import { LoginForm } from './interfaces/index.tsx';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from './components/ErrorDisplay.tsx';
import api from './api.tsx';

const LoginPage: React.FC = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<LoginForm>(
        {
            password: '',
            username: ''
        }
    );
    const [errors, setErrors] = useState<string[]>([]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await api.post("http://127.0.0.1:8000/stock/login", formData);
            const data = response.data;
            console.log(data);

            if (!data.status || !data['token']) {
                setErrors(["Invalid username or password"]);
                localStorage.setItem('authenticated', 'false');
                return;
            }

            setErrors([]);
            localStorage.setItem('token', data['token']);
            localStorage.setItem('authenticated', "true");
            navigate('/')

        } catch (err) {
            console.error("Error : ", err);
            setErrors([err]);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3em 2em',
            }}
        >

            <ErrorDisplay errors={errors} setErrors={setErrors} />
            <Box
                sx={{
                    width: {
                        xs: '90%',
                        sm: "70%",
                        md: "50%",
                        lg: "35%",
                    },
                    padding: {
                        sm: "2em 0",
                    },
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >

                    <Typography sx={{ pb: 12, pt: 2, fontSize: { xs: '2em', sm: '3em', md: '3em' } }}>
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
                            color='success'
                            required

                        />
                    </Box>
                    <Box>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            color="success"
                            required
                        ></TextField>
                    </Box>
                    <Box paddingTop={10} paddingBottom={4}>
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
            </Box>
        </div>
    )

}



export default LoginPage;