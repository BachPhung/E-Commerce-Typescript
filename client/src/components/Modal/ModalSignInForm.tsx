import { Box, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Lock } from "@material-ui/icons";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import './ModalForm.scss'
import React, { useState } from "react";
import { login } from "../../apiCalls";
import { useDispatch } from "react-redux";
import { style } from "./style";
import { ModalSignFormProps } from "../../types";

export const ModalSignInForm = (props: ModalSignFormProps) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    password: '',
    username: '',
    showPassword: false,
  });

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleSubmit = async (e: React.SyntheticEvent) =>{
    e.preventDefault()
    try{
      let {showPassword, ...loginCredential} = values
      await login(dispatch, loginCredential)
    }
    catch(err){
      console.log(err);
    }
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <Box sx={style}>
      <div className="header-form">
        <div className="icon-wrapper">
          <Lock />
        </div>
        <div className="form-title">Sign in</div>
      </div>
      <form onSubmit={e=>handleSubmit(e)}>
      <div>
        <FormControl sx={{ m: 1, width: '99%' }} variant="outlined">
          <InputLabel htmlFor="outlined-username">Username*</InputLabel>
          <OutlinedInput
            id="outlined-username"
            value={values.username}
            onChange={handleChange('username')}
            required
            inputProps={{
              'aria-label': 'username',
            }}
            label="Username"
          />

        </FormControl>
      </div>
      <div>
        <FormControl  sx={{ m: 1, width: '99%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <div className="btn-wrapper">
        <div className="sign-in-btn">
          <Button type="submit" className="btn">Sign In</Button>
        </div>
        <div className="gg-sign-in-btn">
          <Button className="btn">Google Sign In</Button>
        </div>
      </div>
      </form>
      <div className="change-form">
        <Button onClick={props.handleChangeForm} className="change-form-btn">DON'T YOU HAVE AN ACCOUNT? SIGN UP</Button>
      </div>
    </Box>
  )
}
