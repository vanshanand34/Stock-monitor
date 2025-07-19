import React from 'react';
import { Box, Button } from '@mui/material';
import { LoginForm } from '../interfaces/index.tsx';
import { useNavigate } from 'react-router-dom';
import api from '../api.tsx';


const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const response = await api.get("http://127.0.0.1:8000/stock/logout");
            const data = response.data;
            if (data["status"]) {
                localStorage.removeItem('token');
                navigate('/login');
                localStorage.setItem("authenticated", "false");
                console.log(data);
            } else {
                navigate('/login');
            }

        } catch (err) {
            console.log("Error : ", err);
            navigate('/login');
        }
    }

    if (localStorage.getItem('authenticated') === 'false') {
        return (<></>);
    } else {
        return (
            <Box>
                <Box
                    component="form"
                    onSubmit={handleClick}
                    display='flex'
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button
                        type='submit' variant="contained"
                        color="info"
                        sx={{
                            bgcolor: 'gray', fontSize: { xs: '0.7em', md: '0.8em', },
                            fontFamily: 'sans-serif',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            width: {
                                xs: '5em',
                                sm: '6em',
                                md: '7em',
                                lg: '8em'
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>);
    }
}

export default LogoutButton;