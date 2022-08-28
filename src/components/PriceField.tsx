import * as React from 'react';
import { Dispatch, SetStateAction, FC} from "react";

import TextField from '@mui/material/TextField';

interface Props {
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  label:string;
}

const PriceField:FC<Props> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if (e.target.valueAsNumber < 0){
      return
    } else{
      if (isNaN(e.target.valueAsNumber)){
        props.setPrice(0)
      } else {
        props.setPrice(e.target.valueAsNumber)
      }
    }
  }
  return (
      <TextField
      sx={{maxWidth:150}}
      id="outlined-number"
      label={props.label}
      type= {typeof props.price}
      value={props.price.toString()}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      />
  );
}
export default PriceField;

