import { Box, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Lock } from "@material-ui/icons";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import './ModalForm.scss'
import { useEffect, useRef, useState } from "react";
import { style } from "./style";
import { ModalSignFormProps } from "../../types";
import { validateForm } from "./validateForm";
import { register } from "../../apiCalls";
import axios from "axios";

const timerChangeForm = 5; // 5 seconds

export const ModalSignUpForm = (props: ModalSignFormProps) => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
  });
 
  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const { showPassword, repeatPassword, ...signupCredential } = values
    try {
      validateForm(values)
      await register(signupCredential)
      setSuccess(true)
      setError(null)
      setTimeout(props.handleChangeForm,timerChangeForm)
    }
    catch (err: any) {
      if(axios.isAxiosError(err)){
        setError(err.response?.data.error)
        return;
      }
      else if (err instanceof Error) {
        setError( err.message)
      }
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
        <div className="form-title">Sign Up</div>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        <div style={{ display: 'flex', justifyContent: "space-between", width: '100%', marginTop: '16px' }}>
          <FormControl sx={{ width: '45%' }} variant="outlined">
            <InputLabel htmlFor="outlined-first-name">First name*</InputLabel>
            <OutlinedInput
              value={values.first_name}
              onChange={handleChange('first_name')}
              label="Firstname"
              required
              inputProps={{
                'aria-label': 'firstname',
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '45%' }} variant="outlined">
            <InputLabel htmlFor="outlined-first-name">Last name*</InputLabel>
            <OutlinedInput
              value={values.last_name}
              onChange={handleChange('last_name')}
              label="Lastname"
              required
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-username">Username*</InputLabel>
            <OutlinedInput
              id="outlined-username"
              value={values.username}
              onChange={handleChange('username')}
              inputProps={{
                'aria-label': 'username',
              }}
              label="Username"
              required
            />

          </FormControl>
        </div>
        <div>
          <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
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
        <div>
          <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-repeat-password">Repeat Password*</InputLabel>
            <OutlinedInput
              id="outlined-adornment-repeat-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.repeatPassword}
              onChange={handleChange('repeatPassword')}
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
              label="repeatPassword"
            />
          </FormControl>
        </div>
        <div className="btn-wrapper">
          <div className="sign-in-btn">
            <Button type="submit" className="btn">Sign Up</Button>
          </div>
          <div className="gg-sign-in-btn">
            <Button className="btn">Google Sign In</Button>
          </div>
        </div>
        <div style={{ color: 'red', fontSize: '16px', margin: '3px 0', fontWeight: '500' }}>{error}</div>
        <div style={{ color: 'green', fontSize: '16px', margin: '3px 0', fontWeight: '500' }}>{success && "Sign Up success. Changing to login form after "}</div>
      </form>
      <div className="change-form">
        <Button onClick={
          props.handleChangeForm
          } className="change-form-btn">ALREADY HAVE AN ACCOUNT? SIGN IN</Button>
      </div>
    </Box>
  )
}
