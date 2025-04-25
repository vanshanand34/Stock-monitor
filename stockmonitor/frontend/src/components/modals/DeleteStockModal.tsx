import React, { useEffect, useState } from 'react';

import { Box, TextField, Button, ThemeProvider, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@mui/material';
import { DeleteDialogProps } from '../interfaces/index.tsx';


const DeleteStockModal = (props: DeleteDialogProps): JSX.Element => {

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{paddingBottom: 4}}>
                {"Delete this Stock?"}
            </DialogTitle >
            <DialogContent sx={{paddingY: 1}}>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this stock?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{paddingX: 2, paddingY: 2}}>
                <Button
                    onClick={props.deleteStock}
                    variant='contained'
                    color='error'
                >Yes</Button>

                <Button
                    onClick={props.handleClose}
                    variant='contained'
                    color='primary'
                    autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteStockModal;
