import { Dispatch, SetStateAction, FC, PureComponent} from "react";

import {AreaChart, Legend , Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { ApiResObject, ChartObject, ChartPayloadObjectArray } from '../types/Objects';

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

const CustomTooltip = ({ active, payload, label }:any) => {
  if (active){
    return (
      <div className="custom-tooltip">
        <p className="date">{`${label}`}</p>
        <div className="element">
          <p className="badget">{`Your Money: ${payload[0].value.toLocaleString()}`}</p>
          <p className="dolar">{`Current Dolar: ${payload[1].value}`}</p>
        </div>
      </div>
    );
  }
  return null;
}

const FormatYThicks = (value:any) =>{
  if (value.toString().length >= 7){
    value = Math.round(value / (10 ** 6))
    value = value.toString() + 'M'
  } else if (value.toString().length >= 4) {
    value = Math.round(value / (10 ** 3))
    value = value.toString() + 'k'  
  } else {
    value = value.toString()
  }
  return value
}

const BudgetChart :FC<Props> = (props) => {
  var dataArr: {date:string, dolar:number, badget:number}[] = []
  var budget: number = 0
  for (var i=0;i<props.data.date.length;i++){
    budget = budget + (props.price / props.data.value[i])
    var object :ChartObject = {
      "date": props.data.date[i],
      "dolar": Math.round(props.data.value[i] * 100)/100,
      "badget": Math.round(budget * props.data.value[i])
    }
    dataArr.push(object)
  }
  props.setBudget(budget)
  return(
    <>
    <ResponsiveContainer width={"100%"} height={350}>
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
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          < stop offset="35%" stopColor="#0069FF" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#0069FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" fontSize={12}/>
          <YAxis y={10} 
            fontSize={16} 
            domain={[0, Math.floor(budget *  props.data.value[props.data.value.length-1])+1]}
            tickFormatter={FormatYThicks}
          />
          <CartesianGrid  vertical={false} strokeDasharray="1" />
          <Tooltip isAnimationActive={false} active={true} content={<CustomTooltip/>}/>
          <Area type="monotone" dataKey="badget" animationDuration={750} unit=' TRY' strokeWidth={2} stroke="#0069FF" fill="url(#colorUv)" />
          <Area type="monotone" dataKey="dolar" animationDuration={750} unit=' TRY' strokeWidth={2} stroke="white" fill="white" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}
export default BudgetChart;