import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({handleShowPassword,handleChange,half,autoFocus,type,label,name}) => {
  return (
    <Grid item xs = {12} sm={half ? 6:12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label={label} 
            autoFocus={autoFocus}
            type={type}
            InputProps={name ==='password' ? {
                endAdornment:(
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            } : null }//show password field thing
        />
    </Grid>
  )
}

export default Input