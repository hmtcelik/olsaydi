import * as React from 'react';
import { Dispatch, SetStateAction, FC, PureComponent} from "react";

import { AreaChart, LineChart, Line , Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  var dataArr: {date:string, value2:number, badget:number}[] = []
  var budget: number = 0
  for (var i=0;i<props.data.date.length;i++){
    budget = budget + (props.price / props.data.value[i])
    var object :ChartObject = {
      "date": props.data.date[i],
      "value2": Math.round(budget * 100)/100,
      "badget": Math.round(budget * props.data.value[i])
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
        <XAxis dataKey="date" fontSize={12}/>
        <YAxis fontSize={16} domain={[0, Math.floor(budget *  props.data.value[props.data.value.length-1])+1]}/>
        <CartesianGrid strokeDasharray="8 8" />
        <Tooltip isAnimationActive={false} />
        <Area type="monotone" dataKey="badget" unit=' TRY' stroke="#1976d2" fill="#1976d2" />
      </AreaChart>
    </>
  )
}
export default BudgetChart;