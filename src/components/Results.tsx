import React from 'react';

import { ApiResObject, ChartObject } from '../types/Objects';

import Card from '@mui/material/Card';

interface Props{
  data: ApiResObject
  budget: number
  currency: string
  price: number
}

const Results:React.FC<Props> = (props:Props) => {
  const data = props.data
  const budget = props.budget
  const currency = props.currency
  const price= props.price
  
  const [incomeColor, setIncomeColor] = React.useState<string>("green")
  const [incomeSymbol, setIncomeSymbol] = React.useState<string>("+")

  React.useEffect(()=>{
    if (budget > 0){
      setIncomeColor("green")
      setIncomeSymbol("+")
    } else if (budget < 0){
      setIncomeColor("red")
      setIncomeSymbol("-")
    } else {
      setIncomeColor("black")
      setIncomeSymbol("+")
    }
  },[budget])

  return(
    <div className='results'>
        <h2>Your Money: {'\u00A0'}{Math.round(budget * data.value[data.value.length-1]).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} TRY(₺)</h2>
        <h3>You Have : {'\u00A0'}{(Math.round(budget*100)/100).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} {currency}</h3>
        <p style={{color:incomeColor}}>Your Income: {'\u00A0'}{incomeSymbol}{(Math.round(budget * data.value[data.value.length-1]) - (data.value.length * price)).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} TRY(₺)</p>
    </div>
  )

}

export default Results;