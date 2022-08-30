import React from 'react';
import { ApiResObject, ChartObject } from '../types/Objects';

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
  return(
    <>
      <h2>Your Money: {'\u00A0'}{Math.round(budget * data.value[data.value.length-1]).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} TRY(₺)</h2>
      <h3>You Have : {'\u00A0'}{(Math.round(budget*100)/100).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} {currency}</h3>
      <p>Your Income: {'\u00A0'}{(Math.round(budget * data.value[data.value.length-1]) - (data.value.length * price)).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} TRY(₺)</p>
    </>
  )

}

export default Results;