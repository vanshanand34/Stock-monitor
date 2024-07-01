import React , { useEffect , useState } from 'react';
import LoginButton from './LoginButton.tsx';
import {Stock , Additem} from './stock.tsx';
import {BrowserRouter , Navigate, Route , Routes, useNavigate} from 'react-router-dom';
import RegisterPage from './register.tsx';
import LoginPage from './login.tsx';
import LogoutPage from './Logout.tsx';
import { Box  , Table , TableHead , TableCell , TableContainer , TableBody , TableRow, TextField, Button, ThemeProvider} from '@mui/material';
import {AppBar , Toolbar , Typography , Container , Grid , Card , CardContent} from '@mui/material';
import api from './api.tsx';
import {createTheme} from '@mui/material';
import {responsiveFontSizes} from '@mui/material';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page component */}
        <Route path="/register" element={<RegisterPage />} /> {/* About page component */}
        <Route path="/login" element={<LoginPage />} /> {/* Catch-all route for unmatched URLs */}
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
};


const HomePage : React.FC = () =>{
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
    const navigate = useNavigate();
    const [stocks , setStocks] = useState<Stock[]>([]);
    const [addStock , setAddStock] = useState<Additem>({
      symbol:"",
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
          if(localStorage.getItem('message')){
            localStorage.setItem('message','Stock is already in your wishlist');
          }
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
              localStorage.setItem("authenticated","false");
              console.log("Error : ",err);
            }
        }
        fetchdata();
    },[]);
    
    return (
      <div>
        <LoginButton />
        <AppBar >
            <Box  sx={{display:"flex" ,p:1,alignItems:'center',flexWrap:'wrap',justifyContent:'space-between'}}>
              <ThemeProvider theme={theme}>
              <Typography variant="h5" sx={{fontFamily:'Monospace',fontWeight:'bold',letterSpacing:2}}>Stock Wishlist dashboard</Typography>
              </ThemeProvider>
              <Box component="form"  onSubmit={handleSubmit} sx={{display:"flex" , alignItems:'center',padding:"4px 4px"}}>
                <TextField size='small' id="filled-basic" variant='filled' sx={{backgroundColor:"white"}} label='Add Stock...' name="symbol" value={addStock.symbol} onChange={handleChange} type='text'/>
                <Button type="submit" color="success" variant='outlined' sx={{backgroundColor:"white",margin:'0 12px'}} name='submit'>
                  <ThemeProvider theme={theme}>
                    <Typography sx={{fontSize:"calc(0.6rem+0.5vw)"}} component="span" display="inline">Submit</Typography>
                  </ThemeProvider>
                </Button>
              </Box>
            </Box>
        </AppBar>
        <Container sx={{my:'15rem'}}>
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

export default App;
