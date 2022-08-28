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

import { sendGetRequest } from './api/SendGetRequest';
import { sendGetReqOverYear } from './api/SendGetReqOverYear';

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
  
  // handling over 1 year
  const [tempData, setTempData] = React.useState<ApiResObject>({"date":[], "value":[]})
  const dateList:any[] = []
  var temp_date:any = dayjs(new Date().toJSON())

  const GetValues = async () =>{
    if ((endDate?.diff(startDate, 'day') ?? true)>=366){
      dateList.push(endDate)
      temp_date = endDate
      while(true){
        temp_date = temp_date?.subtract(1, 'year')
        if((temp_date?.diff(startDate, 'day') ?? true)>=366){
          dateList.push(temp_date)
        } else {
          dateList.push(temp_date)
          dateList.push(startDate)
          break
        }
      }
      for(var i=0; i<dateList.length-1; i++){
        sendGetReqOverYear(dateList[i+1], dateList[i], currency, i, dateList.length-1, setData, handleError)
      }
      setIsReload(false)
    } else {
      sendGetRequest(startDate, endDate, currency, data, setData, setIsReload, handleError)
    }
  }

  const handleError = (e:any) => {
    setIsError(true)
    console.log(e)
  }

  React.useEffect(()=>{
    setData({"date":[], "value":[]})
    setIsReload(true)
    sessionStorage.clear();
    GetValues()
    if(startDate?.isAfter(endDate)){
      setIsError(true)
    }
  },[startDate, endDate, price, currency])

  
  const fieldMaxWidth = 500
  return (
    <>
      <CssBaseline />
        <Container maxWidth="lg" className='base-wrapper'>
          <Box sx={{ padding:5 }}>
            <div className='dates'>
              <DateField date={startDate} setDate={setStartDate} label="Start Date"/>
              <p>{'\u00A0'}{'\u00A0'}<strong>-</strong>{'\u00A0'}{'\u00A0'}</p>
              <DateField date={endDate} setDate={setEndDate} label="End Date"/>
            </div>
            <div className="price-field">
              <PriceField price={price} setPrice={setPrice} label="Price"/>
            </div>
            <div className="currency-field">
              <CurrencyField currency={currency} setCurrency={setCurrency} label="Type"/>                          
            </div>
            <br />
            {isReload && <CircularProgress />}
            {!isReload && !isError &&
              <>
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
                <h2>Your Badget: {'\u00A0'}{Math.round(budget * data.value[data.value.length-1]).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} TRY(₺)</h2>
                <h3>You Have : {'\u00A0'}{(Math.round(budget*100)/100).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} {currency}</h3>
                <p>You Save: {'\u00A0'}{(Math.round(budget * data.value[data.value.length-1]) - (data.value.length * price)).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} TRY(₺)</p>
              </>
            }
            {isError && 
              <>
                <p className="error-message">Start Date can't be later than End Date </p>
              </>
            }
          </Box>
      </Container>
    </>
  );
}

export default App;
