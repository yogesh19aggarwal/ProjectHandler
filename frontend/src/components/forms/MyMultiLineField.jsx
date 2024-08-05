import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';

export default function MyMultiLineField(props) {
  const {label, width, placeholder, name, control} = props

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field:{onChange, value},
        fieldState:{error},
        formState,
    })=>(
      <TextField
        id="standard-multiline-static"
        sx={{width: {width}}}
        label={label}
        onChange={onChange}
        value={value}
        multiline
        rows={1}
        variant="standard"
        placeholder={placeholder}
        error={!!error}
        helperText={error?.message}
      />
    )}

    />
  );
}
