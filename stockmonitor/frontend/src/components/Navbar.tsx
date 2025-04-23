import React from 'react';

import { Box } from '@mui/material';
import { AppBar, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


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
                        xs: 'center',
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
                            padding: "0 0.5em 0.2em 0.5em",
                            fontSize: {
                                xs: '1.5em',
                                sm: '1.4em',
                                md: '1.5em'
                            },
                        }}
                    >
                        StockTrade
                    </Typography>

                    <TrendingUpIcon />
                </Box>
                {addStockComponent}


            </Box>

        </AppBar>
    )
}

export default NavBar;
