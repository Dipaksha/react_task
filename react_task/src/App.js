import React, {useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Container } from "@mui/system";


function App() {
  const [product, setProductData] = useState([]);
  const [inputDiscount,setInputDiscount]=useState()
  const [discountPrice , setDiscountPrice] = useState();


const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = product.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(()=>{
    fetchData();
    console.log('percentage', product[1]?.price)
  },[])

const fetchData = async () => {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
    setProductData(data.products)
  };


const updatePrice = (e) => {
  setInputDiscount(e.target.value)
}

const handleChangePrice=(selectedItem)=>{
  const percentage = ((selectedItem.price) / 100) * inputDiscount;
  var discountPrice = selectedItem.price-percentage
   setDiscountPrice(discountPrice)
  
}


  return (
    <Container maxWidth="sm">
          <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
      </Paper>
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
                <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{product[activeStep]?.title+"   "}</Typography>
        <Typography> Rs{discountPrice?discountPrice:product[activeStep]?.price}</Typography>
      </Paper>
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
      <input type='text' onChange={updatePrice} placeholder={'Enter Discount'}/>
      <input type='submit' onClick={() =>{handleChangePrice(product[activeStep])}}/>
    </Box>
     </Container>
  );
}

export default App;


