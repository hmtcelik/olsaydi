import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import DateField from './components/DateField';
import PriceField from './components/PriceField';
import CurrencyField from './components/CurrencyField';
import BudgetChart from './components/BudgetChart';
import Results from './components/Results';

import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';

import { ApiResObject } from './types/Objects';

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
  const [startDateCheck, setStartDateCheck ] = React.useState<boolean>(false);

  // handling over 1 year
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
    setIsReload(true)
    setData({"date":[], "value":[]})
    sessionStorage.clear();
    GetValues()
    if(startDate?.isAfter(endDate)){
      setStartDateCheck(true)
    }
  },[startDate, endDate, price, currency])


  return (
    <>
      <Navbar/>
        <CssBaseline />
          <Container maxWidth="lg" className='base-wrapper'>
            <div className="fields">
              <div className='dates'>
                <DateField date={startDate} setDate={setStartDate} label="Start Date"/>
                <p>{'\u00A0'}{'\u00A0'}<strong>-</strong>{'\u00A0'}{'\u00A0'}</p>
                <DateField date={endDate} setDate={setEndDate} label="End Date"/>
              </div>
              <div className="price-fields">
                <PriceField price={price} setPrice={setPrice} label="Price"/>
                {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                <CurrencyField currency={currency} setCurrency={setCurrency} label="Type"/>                          
              </div>
            </div>
              <br />
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
                  <Results data={data} budget={budget} currency={currency} price={price}/>
                </>
              }
              {isError && 
                <Alert sx={{maxWidth:500, margin:"0 auto", marginTop:2 }} severity="error">An Error Occured, Please Refresh The Page</Alert>
              }
              {startDateCheck && 
                <Alert sx={{maxWidth:500, margin:"0 auto", marginTop:2 }} severity="error">Start Date can't be later than End Date</Alert>
              }
              {isReload && <CircularProgress />}
        </Container>
      <Footer />
    </>
  );
}

export default App;
