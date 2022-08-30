import { Dispatch, SetStateAction, FC} from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
      <FormControl fullWidth sx={{maxWidth:150}}>
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