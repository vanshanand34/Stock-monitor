import React, { useEffect, useState } from 'react';

import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DeleteStockModal from './DeleteStockModal.tsx';
import api from '../api.tsx';
import { Stock } from '../stock.tsx';

const StockInfoCard = ({ stock }: { stock: Stock }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const deleteStock = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setIsDeleteDialogOpen(false);
        const response = await api.post(
            "http://127.0.0.1:8000/stock/delete",
            { "symbol": stock.symbol }
        );
        window.location.reload();
    }

    return (
        <Card
            sx={{ borderRadius: '10px', border: 1, borderColor: "grey.500", boxShadow: 3 }}>
            <CardContent
                sx={{
                    fontSize: {
                        sm: '0.5em',
                        md: '1em',
                    },
                    paddingBottom: 0
                }}
            >
                <Box component="form" display={"flex"} justifyContent={"space-between"}
                    onSubmit={
                        (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setIsDeleteDialogOpen(true);
                        }
                    }
                >

                    <Typography
                        component="h2"
                        display={"inline"}
                        sx={{
                            fontSize: {
                                xs: '1.3em',
                                sm: '2em',
                                md: '1.5em'
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
                        fontSize: {
                            xs: '1.1em',
                            sm: '1.7em',
                            md: '1.2em'
                        },
                    }}
                    variant="h6"
                    pt={1}
                >
                    Latest Price : ${stock.latest_value}
                </Typography>

                <Typography
                    display={'flex'}
                    alignItems={'center'}
                    variant="h6"
                    sx={{
                        fontSize: {
                            xs: '1.1em',
                            sm: '1.7em',
                            md: '1.2em',
                        }
                    }}
                    marginBottom={-2}
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
                                <TrendingUpIcon sx={{ paddingTop: 1 }} /> : String.fromCharCode(8595)
                        }
                    </Typography>

                </Typography>
            </CardContent>
            <DeleteStockModal
                isOpen={isDeleteDialogOpen}
                handleClose={() => setIsDeleteDialogOpen(false)}
                deleteStock={deleteStock}
            />
        </Card>
    )
}

export default StockInfoCard;
