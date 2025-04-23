import React, { useEffect, useState } from 'react';

import { Box, TextField, Button } from '@mui/material';
import { Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material';

import LoginButton from '../LoginButton.tsx';
import api from '../api.tsx';
import { Stock, Additem } from '../stock.tsx';
import StockInfoCard from './StockInfoCard.tsx';
import NavBar from './Navbar.tsx';


const HomePage: React.FC = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
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

                const response = await api.post("http://127.0.0.1:8000/stock/", addStock);
                const data = response.data;
                if (data['status'] === 'failed') {
                    alert('Stock is already in your wishlist');
                    setAddStock({ symbol: "" });
                } else {
                    // refresh the page to reflect addition of new stock
                    window.location.reload();
                }
            } catch (err) {
                localStorage.setItem('message', 'Stock is already in your wishlist');
                console.log(err);
            }
        }
        postRequest();
    }


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
            <NavBar
                addStockComponent={
                    <AddStockComponent
                        addStock={addStock}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />} />

            {localStorage.getItem('token') ? <StockWishlist stocks={stocks} /> : <LoginButton />}

        </div>
    )
}

export default HomePage;

const StockWishlist = ({ stocks }: { stocks: Stock[] }) => {
    return (
        <Container sx={{ py: '6rem', }}>
            <Typography
                fontFamily={'system-ui'}
                textAlign={'center'}
                py={4}
                pb={6}
                color="rgb(0, 0, 0)"
                sx={{
                    fontSize: {
                        xs: '2em',
                        sm: '1.5em',
                        md: '2em'
                    }
                }}
            > Your Stock Wishlists</Typography>
            <Grid container spacing={4}>
                {
                    stocks.map(
                        stock => (
                            <Grid item
                                xs={10} sm={6}
                                md={5} lg={4}
                                key={stock.symbol}
                                sx={{ margin: 'auto' }}
                            >
                                <StockInfoCard stock={stock} />
                            </Grid>
                        )
                    )
                }
            </Grid>
        </Container>
    )
}

const AddStockComponent =
    (
        { addStock, handleChange, handleSubmit }:
            {
                addStock: Additem,
                handleChange: ((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void), handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
            }
    ) => {
        return (
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                    alignItems: 'center',
                    padding: "8px 4px",
                }}
            >
                <TextField
                    size='small'
                    id="outlined-size-small"
                    sx={{ borderBottom: "0" }}
                    InputProps={{
                        style: {
                            backgroundColor: "white",
                            borderRadius: "0.3em",
                            width: "35ch",
                        }
                    }}
                    label='Add Stock...'
                    variant="filled"
                    name="symbol"
                    value={addStock.symbol}
                    onChange={handleChange}
                    type='text'
                    required
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
        )
    }


