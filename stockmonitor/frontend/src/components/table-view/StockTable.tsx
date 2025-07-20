import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stock } from '../../interfaces';


const BasicTable = ({ rows }: { rows: Stock[] }) => {
    return (
        <TableContainer component={Paper} sx={{
            maxWidth: {
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%'
            }, margin: 'auto', boxShadow: 3, borderRadius: '10px'
        }} >
            <Table aria-label="simple table" >
                <TableHead>
                    <TableRow sx={{ bgcolor: 'rgba(0, 94, 171, 1)', color: 'white' }}>
                        <CustomTableHeadCell>Stock</CustomTableHeadCell>
                        <CustomTableHeadCell>Latest Value</CustomTableHeadCell>
                        <CustomTableHeadCell>Change</CustomTableHeadCell>
                        <CustomTableHeadCell>Volume</CustomTableHeadCell>
                        <CustomTableHeadCell>Market Cap</CustomTableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.symbol}
                        >
                            <CustomTableCell>{row.symbol}</CustomTableCell>
                            <CustomTableCell>{row.latest_value}</CustomTableCell>
                            <CustomTableCell>{(Number(row.change).toFixed(3))}</CustomTableCell>
                            <CustomTableCell>{(Number(row.change).toFixed(3))}</CustomTableCell>
                            <CustomTableCell>{(Number(row.change).toFixed(3))}</CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

const CustomTableCell = ({ children }: { children: React.ReactNode }) => {

    return (
        <TableCell
            align="center"
            sx={{
                fontSize: { xs: '0.8em', sm: '0.8em', md: '1em', lg: '1em' },
            }}
        >
            {children}
        </TableCell>
    );
};


const CustomTableHeadCell = ({ children }: { children: React.ReactNode }) => {

    return (
        <TableCell align="center"
            sx={{
                fontSize: { xs: '0.8em', sm: '0.8em', md: '1em', lg: '1em' },
                color: 'white',
                fontWeight: {
                    xs: 'semi-bold',
                    sm: 'normal',
                }
            }}
        >
            {children}
        </TableCell>
    );
};



export default BasicTable;