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
  const isOutOfRange = (date: Dayjs) => {
    var bool:boolean = false
    var now = dayjs(new Date())
    var past_limit = dayjs('2008-01-01') 
    if(date.isBefore(past_limit)){
      return true
    } else {
      if(date.isAfter(now)){
        return true
      } else {
        return false
      }
    }
  };

  const handleChange = (newValue: Dayjs | null) => {
    props.setDate(newValue)
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileDatePicker
            label={props.label}
            inputFormat="DD/MM/YYYY"
            value={dayjs(props.date)}
            onChange={handleChange}
            shouldDisableDate={isOutOfRange}
            renderInput={(params) => <TextField {...params} />}
            />
        </Stack>
      </LocalizationProvider>
    </>
    );
  }
export default DateField;