import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Card } from '@mui/material';
import { LoginForm } from '../interfaces/index.tsx';
import { useNavigate } from 'react-router-dom';
import api from '../api.tsx';

const ErrorDisplay = (
    { errors, setErrors }:
        { errors: string[], setErrors: (value: React.SetStateAction<string[]>) => void }
): JSX.Element => {

    console.log(errors)

    return (
        <Box
            paddingY={2}
            paddingRight={2}
            display={'flex'}
            justifyContent={'end'}
            position={'fixed'}
            left={'2em'}
            bottom={'1em'}

            sx={{
                transform: errors.length !== 0 ? '' : 'translateX(-200%)',
                transition: 'transform 0.4s ease-in',
                width: {
                    xs: '80vw',
                    sm: '75vw',
                    md: '50vw',
                    lg: '40vw',
                }
            }}
            zIndex={10}
        >
            <Alert
                variant="filled" severity="error" onClose={() => setErrors([])}
                sx={{
                    width: '100%' ,
                    fontSize: {
                        xs: '0.6em',
                        sm: '0.7em',
                        md: '0.7em',
                        lg: '0.9em'
                    },
                    fontFamily: 'system-ui'
                }}>
                {errors.map((error, index) => <p key={index} style={{ margin: 0.5 }} >{error}<br /></p>)}
            </Alert>
        </Box>
    )
}

export default ErrorDisplay;