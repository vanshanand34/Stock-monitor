import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { AddStockProps } from '../interfaces/index.tsx';


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
                    label={error.length == 0 ? 'Add Stock' : error}
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
                    size="small"
                >
                    Submit
                </Button>
            </Box>

            {/* Icon to show modal for adding stock on smaller screens */}
            <Box px={2} onClick={showAddStockModal} sx={{ display: { sm: 'flex', md: 'none' } }}>
                <Button variant='contained' color='success' size='small' sx={{ fontSize: '0.7rem' }}>
                    Add Stock
                </Button>
            </Box>
        </Box>
    )
}

export default AddStockComponent;
