import React, { useEffect, useState } from 'react';

import { Box, TextField, Button, Dialog, DialogContentText, DialogContent, DialogTitle } from '@mui/material';
import { AddStockModalProps } from '../../interfaces/index';


const AddStockModal = (props: AddStockModalProps): JSX.Element => {

    const [error, setError] = useState("");

    const checkDuplicateStock = (): boolean => {
        for (const stock of props.stocks) {
            if (stock.symbol.trim() === props.addStock.symbol.trim()) {
                setError('Stock already exists in your wishlist');
                return true;
            }
        }
        setError("");
        return false;
    }

    useEffect(() => {
        checkDuplicateStock();
    }, [props.addStock]);


    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                display: {
                    sm: "block",
                    md: "none",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ paddingX: '2em', paddingY: '1em' }} fontWeight={600}>
                Add Stock to wishlist
            </DialogTitle>
            <DialogContent sx={{ marginX: '1em' }}>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{
                        paddingY: '1em',
                        fontSize: {
                            xs: '0.9em',
                        }
                    }}
                >
                    Enter the stock to add in wishlist
                </DialogContentText>
                <Box component={'form'}
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            if (checkDuplicateStock()) {
                                return;
                            };
                            props.handleSubmit(e);
                        }
                    }>
                    <TextField
                        size='small'
                        id="standard-error-helper-text"
                        InputProps={{
                            style: {
                                backgroundColor: "white",
                                borderRadius: "0.3em",
                                width: "25ch",
                            }
                        }}
                        label='Add Stock'
                        variant="outlined"
                        name="symbol"
                        value={props.addStock.symbol}
                        onChange={props.handleChange}
                        type='text'
                        sx={{
                            marginY: '1em'
                        }}
                        helperText={error}
                        error={error ? true : false}
                        required
                    />
                    <Box display={'flex'} justifyContent={'center'} gap={'1em'} py={2}>
                        <Button type='submit' variant='contained' color='success'>Submit</Button>
                        <Button
                            variant='contained'
                            onClick={props.handleClose}
                            sx={{
                                color: 'white',
                                bgcolor: 'gray'
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </DialogContent>

        </Dialog>
    );
}

export default AddStockModal;
