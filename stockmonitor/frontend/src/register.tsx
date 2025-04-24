import axios from 'axios';
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { PasswordComponentProps, RegistrationForm } from './interfaces/index.tsx';
import { useNavigate } from 'react-router-dom';
import api from './api.tsx';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorDisplay from './components/ErrorDisplay.tsx';

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
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(); // Prevent default form submission
        const fetchdata = async () => {
            try {
                console.log(formData)
                const response = await api.post("http://127.0.0.1:8000/stock/register", formData);
                const responseData = response.data;
                console.log(responseData);

                if (responseData.status) {
                    navigate('/login');
                    setErrors([]);
                } else {
                    const errors = responseData.error;
                    const errorList: string[] = [];
                    for (const key in errors) {
                        errorList.push(`${key}: ${errors[key]}`);
                    }
                    console.log(errors);
                    setErrors(errorList);
                }
            } catch (err) {
                console.log("Error : ", err);
                setErrors(["Some unexpected error occured"]);
            }
        }
        fetchdata();
    };
    return (
        <div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    width: {
                        xs: '100%',
                        sm: '60%',
                        md: '80%',
                        lg: '70%'
                    },
                    margin: 'auto',
                    paddingY: 6
                }}
            >
                <Typography variant="h3" sx={{ py: 2 }}>
                    Register
                </Typography>

                <TextField
                    label="First Name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    sx={{ width: { xs: '80%', sm: '75%', md: '50%', lg: '45%' }, m: 1 }}
                    required
                />
                <TextField
                    label="User Name"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    sx={{ width: { xs: '80%', sm: '75%', md: '50%', lg: '45%' }, m: 1 }}
                    required
                />
                <TextField
                    label="Last Name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    sx={{ width: { xs: '80%', sm: '75%', md: '50%', lg: '45%' }, m: 1 }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ width: { xs: '80%', sm: '75%', md: '50%', lg: '45%' }, m: 1 }}
                    required
                />
                <ShowHidePassword
                    name='password'
                    label='Password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <ShowHidePassword
                    name='password2'
                    label='Confirm Password'
                    value={formData.password2}
                    onChange={handleChange}
                />
                <Box py={2}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        name="Submit"
                        sx={{ px: 3, py: 1 }}>
                        <Typography component="span" display="inline">Submit</Typography>
                    </Button>
                </Box>
            </Box>
            <ErrorDisplay errors={errors} setErrors={setErrors} />
        </div>
    )

}

const ShowHidePassword: React.FC<PasswordComponentProps> = ({ label, name, value, onChange }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ width: { xs: '80%', sm: '75%', md: '50%', lg: '45%' }, m: 1 }}
            variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                id={`outlined-adornment-password-${name}`}
                type={showPassword ? 'text' : 'password'}
                required
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            />
        </FormControl>
    )
}



export default RegisterPage;