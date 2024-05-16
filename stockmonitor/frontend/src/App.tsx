import axios from 'axios';
import React , { useEffect , useState } from 'react';
import {Stock} from './stock.tsx';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import RegisterPage from './register.tsx';
import LoginPage from './login.tsx';
import { Table , TableHead , TableCell , TableContainer , TableBody , TableRow} from '@mui/material';
import {AppBar , Toolbar , Typography , Container , Grid , Card , CardContent} from '@mui/material';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page component */}
        <Route path="/register" element={<RegisterPage />} /> {/* About page component */}
        <Route path="/login" element={<LoginPage />} /> {/* Catch-all route for unmatched URLs */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;




const HomePage : React.FC = () =>{
    const [stocks , setStocks] = useState<Stock[]>([]);
    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                const response = await axios.get("http://127.0.0.1:8000/stock/");
                setStocks(response.data);
            }catch(err){
                console.log("Error : ",err);
            }
        }
        fetchdata();
    },[]);
    
    // function myarrow(number){
    //   if(arrow>0)
    // }
    return (
      <div>
        <AppBar >
          <Toolbar>
            <Typography variant="h4" sx={{fontFamily:'Monospace',fontWeight:'bold',letterSpacing:2}}>Stock Wishlist dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{mt:12}}>
          <Grid container spacing={6}>{stocks.map(stock=>(
            <Grid item xs={12} sm={12} md={12} key={stock.symbol}>
              <Card sx={{borderRadius:'10px',border:1,borderColor:"grey.500",boxShadow:3}}>
                <CardContent>
                  <Typography variant="h5" component="h2">{stock.symbol}</Typography>
                  <Typography sx={{color:"primary.main",}} variant="h5">Latest Price : ${stock.latest_value}</Typography>
                  <Typography color="textSecondary" variant="h5">Change : {stock.change} 
                    <Typography component="span" variant="h3" display={"inline"} sx={{color:"primary.main",mx:2}}>
                          {(parseFloat(stock.change)>0)?(String.fromCharCode(8593)):String.fromCharCode(8595)}
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          </Grid>
        </Container>
      </div>
    )
}



// knfsdnx
// sdv zs sdf
// /* <h1>My Stock Wishlist</h1>
      // <table>
      //   <thead>
      //     <tr>
      //       <td>Symbol</td>
      //       <td>Latest Price</td>
      //       <td>Change</td>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {stocks.map((arr)=>(
      //       <tr key={arr.symbol}>
      //         <td>{arr.symbol}</td>
      //         <td>{arr.latest_value}</td>
      //         <td>{arr.change}</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table> */
      // /* <TableContainer sx={{width:'100%'}}>
      //   <Table>
      //     <TableHead>
      //       <TableRow>
      //       <TableCell>Symbol</TableCell>
      //       <TableCell align="right">Latest PRice</TableCell>
      //       <TableCell align="right">change</TableCell>
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //     {stocks.map((arr)=>(
      //       <TableRow key={arr.symbol}>
      //         <TableCell>{arr.symbol}</TableCell>
      //         <TableCell align="right">{arr.latest_value}</TableCell>
      //         <TableCell align="right">{arr.change}</TableCell>
      //       </TableRow>
      //     ))}
      //     </TableBody>
      //   </Table>
      // </TableContainer> */

      
      
