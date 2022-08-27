import * as React from 'react';
import axios from 'axios';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs, { Dayjs } from 'dayjs';

import DateField from './components/DateField';
import PriceField from './components/PriceField';
import CurrencyField from './components/CurrencyField';
import BudgetChart from './components/BudgetChart';

import { ApiResObject, ChartObject } from './types/Objects';

function App() {
  /* states */
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(new Date(new Date().getFullYear(), 0, 1).toJSON()));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(new Date().toJSON()));
  const [currency, setCurrency] = React.useState<string>('USD');
  const [price, setPrice] = React.useState<number>(10);
  const [data, setData] = React.useState<ApiResObject>({"date":[], "value":[]})
  const [budget, setBudget] = React.useState<number>(0);
  const [isReload, setIsReload] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  const GetValues = () =>{
    axios
    .get(`/timeseries/?start_date=${startDate?.add(1, 'days').toJSON().slice(0, 10)}&end_date=${endDate?.toJSON().slice(0, 10)}&base=${currency}&symbols=TRY`)
    .then((res)=>{
      setIsReload(false)
      if (res.data.success){
        setData({
          "date": Object.keys(res.data.rates),
          "value": Object.values(res.data.rates).map((item:any) => {return item.TRY})
        })
      } else {
        setIsError(true)
      }
    })
    .catch(function (error) {
      if (error.response) {
        setIsError(true)
        console.log(error)  
      }
    })
  }
  React.useEffect(()=>{ 
    GetValues()
  },[startDate, endDate, price, currency])

  return (
    <>
      <CssBaseline />
        <Container maxWidth="lg" className='wrapper'>
          <Box sx={{ padding:5 }}>
            <DateField date={startDate} setDate={setStartDate} label="Start Date"/>
            <DateField date={endDate} setDate={setEndDate} label="End Date"/>
            <PriceField price={price} setPrice={setPrice} label="Price"/>
            <CurrencyField currency={currency} setCurrency={setCurrency} label="Type"/>            
            {isReload && <CircularProgress />}
            {!isReload && 
              <BudgetChart 
                data={data} 
                setData={setData} 
                base={currency} 
                to='TRY' 
                budget={budget}
                setBudget={setBudget}
                price={price}
                setPrice={setPrice} 
              />
            }
          <h2>Your Badget: {'\u00A0'}{Math.round(budget * data.value[data.value.length-1]).toLocaleString()} TRY(₺)</h2>
          <h3>You Have : {'\u00A0'}{(Math.round(budget*100)/100).toLocaleString()} {currency}</h3>
          <p>You Save: {'\u00A0'}{(Math.round(budget * data.value[data.value.length-1]) - (data.value.length * price)).toLocaleString()} TRY(₺)</p>
          </Box>
      </Container>
    </>
  );
}

export default App;
