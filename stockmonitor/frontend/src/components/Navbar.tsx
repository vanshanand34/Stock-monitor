import React from 'react';

import { Box } from '@mui/material';
import { AppBar, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutPage from '../Logout.tsx';
import LogoutButton from '../Logout.tsx';


const NavBar = ({ addStockComponent }: { addStockComponent: JSX.Element }) => {
    return (
        <AppBar >

            <Box
                sx={{
                    display: "flex",
                    p: 1,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: {
                        xs: 'space-between',
                        md: 'space-between',
                    },
                    height: {
                        xs: '2.4rem',
                        sm: '3.5rem'
                    }

                }}>

                <Box
                    display={"flex"}
                    alignItems={"center"}
                    sx={{
                        justifyContent: {
                            xs: 'center',
                            md: 'space-between'
                        }
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "system-ui",
                            fontWeight: 'medium',
                            letterSpacing: 1,
                            padding: {
                                xs: "0 0.5em 0.2em 0.5em",
                            },
                            fontSize: {
                                xs: '1.1em', sm: '1.4em', md: '1.5em'
                            },
                        }}
                    >
                        StockTrade
                    </Typography>
                    <Box
                        sx={{
                            padding: {
                                fontSize: '0.1em'
                            }
                        }}
                    >
                        <TrendingUpIcon sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }} />
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={'center'} sx={{ gap: { sm: 1, md: 4 } }}>
                    {addStockComponent}
                    <LogoutButton />
                </Box>
            </Box>

        </AppBar>
    )
}

export default NavBar;
