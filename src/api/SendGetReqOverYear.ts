import * as React from 'react';
import { Dayjs } from 'dayjs';
import axios from 'axios';

import { ApiResObject } from '../types/Objects';


export const sendGetReqOverYear =  (
  start_date:Dayjs|null|undefined, 
  end_date:Dayjs|null|undefined,
  base:string,
  index:number,
  index_range: number,
  setData:React.Dispatch<React.SetStateAction<ApiResObject>>,
  errorHandler:Function
) => {
  axios
    .get(`https://api.exchangerate.host/timeseries/?start_date=${start_date?.toJSON().slice(0, 10)}&end_date=${end_date?.toJSON().slice(0, 10)}&base=${base}&symbols=TRY`)
    .then((res)=>{
      if (res.data.success){
        sessionStorage.setItem(index.toString(),  JSON.stringify({
          "date": Object.keys(res.data.rates),
          "value": Object.values(res.data.rates).map((item:any) => {return item.TRY})
        }))
        if (JSON.parse(sessionStorage.getItem(index.toString()) ||'{}') !== '{}'){
          var tempData:any = {"date":[], "value":[]}
          for(var j=0;j<index_range;j++){
            tempData = {
                "date":  JSON.parse(sessionStorage.getItem(j.toString()) ||'{}').date.concat(tempData.date),
                "value": JSON.parse(sessionStorage.getItem(j.toString()) ||'{}').value.concat(tempData.value),
              }
          }
          setData(tempData)
        }
      }
    })
    .catch(function (error) {
      if (error.response) {
        errorHandler(error)
      }
    })
}