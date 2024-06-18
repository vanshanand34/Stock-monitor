import React , { useEffect , useState } from 'react';
import {Stock , Additem} from './stock.tsx';
import {BrowserRouter , Navigate, Route , Routes, useNavigate} from 'react-router-dom';
import RegisterPage from './register.tsx';
import LoginPage from './login.tsx';
import { Box  , Table , TableHead , TableCell , TableContainer , TableBody , TableRow, TextField, Button} from '@mui/material';
import {AppBar , Toolbar , Typography , Container , Grid , Card , CardContent} from '@mui/material';
import api from './api.tsx';

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
    const navigate = useNavigate();
    const [stocks , setStocks] = useState<Stock[]>([]);
    const [addStock , setAddStock] = useState<Additem>({
      symbol:" ",
    });
    const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(event.target.value);
      setAddStock({symbol:event.target.value });
    }
    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      const postRequest = async () => {
        try{
          console.log("DATA :",addStock);
          const response = await api.post("http://127.0.0.1:8000/stock/",addStock);
          const data = response.data;
          console.log(data);
          window.location.reload(); //to refresh the page to reflect addition of new stock in wishlist
        }catch(err){
          console.log(err);
        }
      }
      postRequest();
    }
    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                const response = await api.get("http://127.0.0.1:8000/stock/");
                setStocks(response.data);
            }catch(err){
                console.log("Error : ",err);
            }
        }
        fetchdata();
    },[]);
    
    return (
      <div>
        <AppBar >
            <Box  sx={{display:"flex" ,p:1,alignItems:'center',flexWrap:'wrap'}}>
              <Typography variant="h4" sx={{mr:'30vw' ,fontFamily:'Monospace',fontWeight:'bold',letterSpacing:2,fontSize:'1.6rem'}}>Stock Wishlist dashboard</Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{display:"flex" , alignItems:'center'}}>
                <TextField size='small' id="filled-basic" variant='filled' sx={{backgroundColor:"white",mr:'4vw'}} label='Add Stock...' name="symbol" value={addStock.symbol} onChange={handleChange} type='text'/>
                <Button type="submit" color='success' variant='outlined' sx={{backgroundColor:"white"}} name='submit'><Typography variant='h6' component="span" display="inline">Submit</Typography> </Button>
              </Box>
            </Box>
        </AppBar>
        <Container sx={{my:12}}>
          <Grid container spacing={4}>{stocks.map(stock=>(
            <Grid item xs={8} sm={10} md={8} lg={10} key={stock.symbol} sx={{margin:'auto'}} >
              <Card 
              sx={{borderRadius:'10px',border:1,borderColor:"grey.500",boxShadow:3}}>
                <CardContent>
                  <Typography variant="h5" component="h2">{stock.symbol}</Typography>
                  <Typography sx={{color:"primary.main",}} variant="h5">Latest Price : ${stock.latest_value}</Typography>
                  <Typography color="textSecondary" variant="h5">Change : {stock.change} 
                    <Typography component="span" variant="h4" display={"inline"} sx={{color:"primary.main",mx:2}}>
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