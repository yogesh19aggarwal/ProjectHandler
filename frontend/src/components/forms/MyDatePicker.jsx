import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Controller} from 'react-hook-form';


export default function MyDatePicker(props) {

    const {label,width, name, control} = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <Controller
        name={name}
        control={control}
        render={({
          field:{onChange, value},
          fieldState:{error},
        })=>(
            <DatePicker 
                label={label} 
                sx={{width: {width}}}
                onChange={onChange}
                value={value}
                slotProps={{
                  textField:{
                    error:!!error,
                    helperText: error?.message,
                  }
                }}
            />
        )}
    />

    </LocalizationProvider>
  );
}