import * as React from 'react';
import { Dispatch, SetStateAction, FC} from "react";

import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

interface Props {
  date:Dayjs | null;
  setDate: Dispatch<SetStateAction<Dayjs | null>>;
  label:string;
}

const DateField :FC<Props> = (props) => {
  const handleChange = (newValue: Dayjs | null) => {
    props.setDate(newValue)
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{ maxWidth:500, }}>
          <MobileDatePicker  
            label={props.label}
            inputFormat="DD/MM/YYYY"
            value={dayjs(props.date)}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            />
        </Stack>
      </LocalizationProvider>
    </>
    );
  }
export default DateField;