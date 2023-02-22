import React, {useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Container,  styled, ThemeProvider } from "@mui/system";
import { Grid } from "@mui/material";


function App() {
  

const theme = useTheme();
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));
  const [activeStep, setActiveStep] = React.useState(0);
  const [product, setProductData] = useState([]);
  const [inputDiscount,setInputDiscount] = useState(product[activeStep]?.discountPercentage ? product[activeStep]?.discountPercentage: undefined)

  const [discountPrice , setDiscountPrice] = useState();

  const maxSteps =product&& product?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(()=>{
    fetchData();
  },[])

  

const fetchData = async () => {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
    setProductData(data.products)
  };

console.log("product",product)

const updatePrice = (e) => {
  setInputDiscount(e.target.value)
}

const handleChangePrice=(selectedItem)=>{

//   tempArray.map((item)=>{
// if(selectedItem.id===item.id){
//   const percentage = ((selectedItem.price) / 100) * inputDiscount;
//   var discountPrice = selectedItem.price-percentage
//    setDiscountPrice(discountPrice)
// }
//   })
const percentage = ((selectedItem.price) / 100) * inputDiscount;
var discountPrice = selectedItem.price-percentage
 setDiscountPrice(discountPrice)
}

console.log("object",discountPrice)
  return (
    <Container maxWidth="sm">
          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          
         
      <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={product[activeStep]?.thumbnail}
                alt={product[activeStep]?.title}>
                  
                </Box>
                <Grid  >
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
               <Item >
               {product[activeStep]?.title+"   "}
                      </Item>
              <Item>
               Total Price : {product[activeStep]?.price}
              </Item>
              <Item>
              Discount Price: {discountPrice&&discountPrice}
              </Item>
            </Box>
          </ThemeProvider>
        </Grid>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <input type='text' value={inputDiscount} onChange={updatePrice} placeholder={'Enter Discount'} defaultValue={product[activeStep]?.discountPercentage}/>
      <input type='submit' onClick={() =>{handleChangePrice(product[activeStep])}}/>
    </Box>
     </Container>
  );
}

export default App;


