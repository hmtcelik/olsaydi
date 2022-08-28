import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

import { ApiResObject, ChartObject } from '../types/Objects';


export const sendGetReqOverYear =  (
  start_date:Dayjs|null|undefined, 
  end_date:Dayjs|null|undefined, 
  base:string, 
  data:ApiResObject,
  setData:React.Dispatch<React.SetStateAction<ApiResObject>>,
  setReloadProcessor:React.Dispatch<React.SetStateAction<boolean>>,
  errorHandler:Function
) => {
  axios
    .get(`/timeseries/?start_date=${start_date?.add(1, 'days').toJSON().slice(0, 10)}&end_date=${end_date?.toJSON().slice(0, 10)}&base=${base}&symbols=TRY`)
    .then((res)=>{
      console.log(start_date?.add(1, 'days').toJSON().slice(0, 10))
      console.log(end_date?.add(1, 'days').toJSON().slice(0, 10))
      console.log(res.data.rates)
      console.log(data)

      if (res.data.success){
        setData({
          "date": Object.keys(res.data.rates).concat(data.date),
          "value": Object.values(res.data.rates).map((item:any) => {return item.TRY}).concat(data.value)
        })
      }
    })
    .catch(function (error) {
      if (error.response) {
        errorHandler(error)
      }
    })
}