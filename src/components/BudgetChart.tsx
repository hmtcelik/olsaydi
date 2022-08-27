import * as React from 'react';
import { Dispatch, SetStateAction, FC, PureComponent} from "react";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { ApiResObject, ChartObject } from '../types/Objects';


interface Props {
  data:ApiResObject;
  setData: Dispatch<SetStateAction<ApiResObject>>;
  base: string;
  to: string;
  budget: number;
  setBudget: Dispatch<SetStateAction<number>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
}


const BudgetChart :FC<Props> = (props) => {
  var dataArr: {date:string, value:number}[] = []
  var budget: number = 0
  for (var i=0;i<props.data.date.length;i++){
    budget = budget + (props.price / props.data.value[i])
    var object :ChartObject = {
      "date": props.data.date[i],
      "value": Math.round(budget * 100)/100
    }
    dataArr.push(object)
  }
  props.setBudget(budget)
  return(
    <>
      <AreaChart
        width={1000}
        height={400}
        data={dataArr}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, Math.floor(budget)+1]}/>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#1976d2" fill="#1976d2" />
      </AreaChart>
    </>
  )
}
export default BudgetChart;