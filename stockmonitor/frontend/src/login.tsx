import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Card } from '@mui/material';
import { LoginForm } from './stock';
import { useNavigate } from 'react-router-dom';
import api from './api.tsx';

const LoginPage: React.FC = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<LoginForm>(
        {
            password: '',
            username: ''
        }
    );
    const [error, setError] = useState("");


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
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3em 2em',
            }}
        >

            <ErrorDisplay error={error} setError={setError} />
            <Card
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
                    boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, 0.2)",
                }}
                variant="outlined"
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
            </Card>
        </div>
    )

}

const ErrorDisplay = (
    { error, setError }:
        { error: string, setError: (value: React.SetStateAction<string>) => void }
): JSX.Element => {

    return (
        <Box
            paddingY={2}
            paddingX={2}
            display={'flex'}
            justifyContent={'end'}
            width={'35vw'}
            position={'fixed'}
            right={'3em'}
            top={'0em'}

            sx={{
                transform: error !== '' ? '' : 'translateX(200%)',
                transition: 'transform 0.4s ease-in'
            }}
        >
            <Alert variant="filled" severity="error" onClose={() => setError("")} sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Box>
    )
}



export default LoginPage;