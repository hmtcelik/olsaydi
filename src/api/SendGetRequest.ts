import * as React from 'react';
import { Dayjs } from 'dayjs';
import axios from 'axios';

import { ApiResObject } from '../types/Objects';


export const sendGetRequest =  (
  start_date:Dayjs|null|undefined, 
  end_date:Dayjs|null|undefined, 
  base:string, 
  data:ApiResObject,
  setData:React.Dispatch<React.SetStateAction<ApiResObject>>,
  setReloadProcessor:React.Dispatch<React.SetStateAction<boolean>>,
  errorHandler:Function
) => {
  axios
    .get(`https://api.exchangerate.host/timeseries/?start_date=${start_date?.toJSON().slice(0, 10)}&end_date=${end_date?.toJSON().slice(0, 10)}&base=${base}&symbols=TRY`)
    .then((res)=>{
      setReloadProcessor(false)
      if (res.data.success){
        setData({
          "date": Object.keys(res.data.rates),
          "value": Object.values(res.data.rates).map((item:any) => {return item.TRY}),
        })
      }
    })
    .catch(function (error) {
      if (error.response) {
        errorHandler(error)
      }
    })
}