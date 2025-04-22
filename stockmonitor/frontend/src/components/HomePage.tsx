import React, { useEffect, useState } from 'react';

import { Box, TextField, Button, ThemeProvider } from '@mui/material';
import { AppBar, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import LoginButton from '../LoginButton.tsx';
import api from '../api.tsx';
import { Stock, Additem } from '../stock.tsx';


const HomePage: React.FC = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    // const navigate = useNavigate();
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [addStock, setAddStock] = useState<Additem>(
        {
            symbol: "",
        }
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event.target.value);
        setAddStock({ symbol: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const postRequest = async () => {
            try {
                // console.log("DATA :", addStock);
                const response = await api.post("http://127.0.0.1:8000/stock/", addStock);
                const data = response.data;
                if (data['status'] === 'failed') {
                    alert('Stock is already in your wishlist');
                    // window.location.reload(); //to refresh the page to reflect addition of new stock in wishlist

                } else {
                    // alert(data);
                    // console.log(data);
                    // localStorage.setItem('message','');
                    window.location.reload(); //to refresh the page to reflect addition of new stock in wishlist
                }
            } catch (err) {
                localStorage.setItem('message', 'Stock is already in your wishlist');
                console.log(err);
            }
        }
        postRequest();
    }

    //adding logout button's functionality

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await api.get("http://127.0.0.1:8000/stock/");
                setStocks(response.data);
                localStorage.setItem("authenticated", "true");
                localStorage.setItem('message', '');
            } catch (err) {
                localStorage.setItem("authenticated", "false");
                console.log("Error : ", err);
            }
        }
        fetchdata();
    }, []);

    return (
        <div>
            <LoginButton />
            <AppBar >

                <Box
                    sx={{
                        display: "flex",
                        p: 1,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        height: '4rem',
                        [theme.breakpoints.down('sm')]: {
                            height: '2rem'
                        }
                    }}>

                    <ThemeProvider theme={theme}>
                        <Box display={"flex"} alignItems={"center"}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: "Calibri, 'Trebuchet MS', sans-serif",
                                    fontWeight: 'bold',
                                    letterSpacing: 1,
                                    margin: "0 10px"
                                }}
                            >
                                Stock Wishlist dashboard
                            </Typography>

                            <TrendingUpIcon></TrendingUpIcon>
                        </Box>

                    </ThemeProvider>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            alignItems: 'center',
                            padding: "8px 4px",
                            [theme.breakpoints.down('md')]: {
                                display: "none"
                            }
                        }}
                    >
                        <TextField
                            size='small'
                            id="outlined-size-small"
                            sx={{ borderBottom: "0" }}
                            InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    borderRadius: "0",
                                    width: "20ch",
                                }
                            }}
                            label='Add Stock...'
                            variant="filled"
                            name="symbol"
                            value={addStock.symbol}
                            onChange={handleChange}
                            type='text'
                        />

                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            sx={{ margin: '0 12px' }}
                            name='submit'
                        >
                            Submit
                        </Button>
                    </Box>
                    {/* <LogoutButton /> */}
                </Box>

            </AppBar>
            <Container sx={{ my: '10rem' }}>
                <Grid container spacing={4}>
                    {
                        stocks.map(
                            stock => (
                                <Grid item xs={10} sm={6} md={5} lg={4} key={stock.symbol} sx={{ margin: 'auto' }} >
                                    <Card
                                        sx={{ borderRadius: '10px', border: 1, borderColor: "grey.500", boxShadow: 3 }}>
                                        <CardContent
                                            sx={{
                                                [theme.breakpoints.down('md')]: {
                                                    fontSize: '0.5em'
                                                }
                                            }}
                                        >
                                            <Box component="form" display={"flex"} justifyContent={"space-between"}
                                                onSubmit={
                                                    async (event: React.FormEvent<HTMLFormElement>) => {
                                                        event.preventDefault();
                                                        const response = await api.post(
                                                            "http://127.0.0.1:8000/stock/delete",
                                                            { "symbol": stock.symbol }
                                                        );
                                                        // console.log(response);
                                                        window.location.reload();
                                                    }
                                                }>

                                                <Typography
                                                    component="h2"
                                                    display={"inline"}
                                                    sx={{
                                                        [theme.breakpoints.down('md')]: {
                                                            fontSize: '2.5em'
                                                        }
                                                    }}
                                                    variant="h5"
                                                >
                                                    {stock.symbol}
                                                </Typography>

                                                <Button type="submit" sx={{
                                                    padding: "0"
                                                }}>
                                                    <DeleteIcon
                                                        sx={{
                                                            margin: "0",
                                                            padding: "0"
                                                        }}
                                                        color='error'
                                                        titleAccess='Delete Stock'
                                                    />

                                                </Button>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    color: "primary.main",
                                                    [theme.breakpoints.down('md')]: {
                                                        fontSize: '2em'
                                                    }
                                                }}
                                                variant="h6"
                                            >
                                                Latest Price : ${stock.latest_value}
                                            </Typography>

                                            <Typography
                                                color="textSecondary"
                                                variant="h6"
                                                sx={{
                                                    [theme.breakpoints.down('md')]: {
                                                        fontSize: '2em'
                                                    }
                                                }}
                                            >
                                                Change : {parseFloat(stock.change).toFixed(3)}

                                                <Typography
                                                    component="span"
                                                    variant="h6"
                                                    display={"inline"}
                                                    sx={{ color: "primary.main", mx: 2 }}
                                                >
                                                    {
                                                        (parseFloat(stock.change) > 0) ?
                                                            String.fromCharCode(8593) : String.fromCharCode(8595)
                                                    }
                                                </Typography>

                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        )
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default HomePage;