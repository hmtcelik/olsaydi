import * as React from 'react';
import { Dispatch, SetStateAction, FC} from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


interface Props {
  currency:string;
  setCurrency: Dispatch<SetStateAction<string>>;
  label:string;
}

const CurrencyField :FC<Props> = (props) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.setCurrency(event.target.value as string);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.currency}
          label={props.label}
          onChange={handleChange}
        >
          <MenuItem value='USD'>USD($)</MenuItem>
          <MenuItem value='EUR'>EUR(€)</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
export default CurrencyField;