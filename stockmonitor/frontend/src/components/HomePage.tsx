import React, { useEffect, useState } from 'react';

import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import LoginButton from '../LoginButton.tsx';
import api from '../api.tsx';
import { Stock, Additem, AddStockProps } from '../interfaces/index.tsx';
import StockInfoCard from './StockInfoCard.tsx';
import NavBar from './Navbar.tsx';
import AddStockModal from './AddStockModal.tsx';


const HomePage: React.FC = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [addStock, setAddStock] = useState<Additem>({ symbol: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event.target.value);
        setAddStock({ symbol: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        setIsAddStockModalOpen(false);
        event.preventDefault();
        const postRequest = async () => {
            try {

                const response = await api.post("http://127.0.0.1:8000/stock/", addStock);
                const data = response.data;
                if (data['status'] === 'failed') {
                    alert('Stock is already in your wishlist');
                    setAddStock({ symbol: "" });
                } else {
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
            setIsLoading(true);
            try {
                const response = await api.get("http://127.0.0.1:8000/stock/");
                setStocks(response.data);
                localStorage.setItem("authenticated", "true");
                localStorage.setItem('message', '');
                setIsLoading(false);
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
                        stocks={stocks}
                        addStock={addStock}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        showAddStockModal={() => setIsAddStockModalOpen(true)}
                    />}
            />

            {
                localStorage.getItem('token') ?
                    <StockWishlist stocks={stocks} isLoading={isLoading} /> :
                    <LoginButton />
            }
            <AddStockModal
                isOpen={isAddStockModalOpen}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                addStock={addStock}
                handleClose={() => setIsAddStockModalOpen(false)}
                stocks={stocks}
            />

        </div>
    )
}

export default HomePage;

const StockWishlist = ({ stocks, isLoading }: { stocks: Stock[], isLoading: boolean }) => {
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

            {isLoading ? <Box display={'flex'} justifyContent={'center'} width={'100%'} py={6}><CircularProgress /></Box> :
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
            }
        </Container>
    )
}

const AddStockComponent: React.FC<AddStockProps> = (
    { stocks, addStock, handleChange, handleSubmit, showAddStockModal }
) => {

    const [error, setError] = useState("");
    const checkDuplicateStock = (): boolean => {
        for (const stock of stocks) {
            if (stock.symbol.trim() === addStock.symbol.trim()) {
                setError('Stock already exists in your wishlist');
                return true;
            }
        }
        setError("");
        return false;
    }

    useEffect(() => {
        checkDuplicateStock();
    }, [addStock]);

    return (
        <Box>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (checkDuplicateStock()) {
                        return;
                    };
                    handleSubmit(e);
                }}
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
                            width: "35ch",
                        }
                    }}
                    label={error.length == 0 ? 'Add Stock': error}
                    variant="filled"
                    name="symbol"
                    value={addStock.symbol}
                    onChange={handleChange}
                    type='text'
                    required
                    error={error.length !== 0}
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

            {/* Icon to show modal for adding stock on smaller screens */}
            <Box px={2} onClick={showAddStockModal} sx={{display:{ sm: 'block' , md: 'none'}}}><AddIcon /></Box>
        </Box>
    )
}


