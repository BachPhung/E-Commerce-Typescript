import { Box, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Lock } from "@material-ui/icons";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import './ModalForm.scss'
import { useState } from "react";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  minHeight: 500,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 40,
  p: 4,
};

interface ModalSignUpFormProps {
  handleChangeForm: () => void
}

export const ModalSignUpForm = (props: ModalSignUpFormProps) => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    repeatPassword: '',
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
      <div style={{ display: 'flex', justifyContent: "space-between", width: '100%', marginTop: '16px' }}>
        <FormControl sx={{ width: '45%' }} variant="outlined">
          <InputLabel htmlFor="outlined-first-name">First name*</InputLabel>
          <OutlinedInput
            value={values.firstname}
            onChange={handleChange('firstname')}
            label="Firstname"
            required
          />
        </FormControl>
        <FormControl sx={{ width: '45%' }} variant="outlined">
          <InputLabel htmlFor="outlined-first-name">First name*</InputLabel>
          <OutlinedInput
            value={values.lastname}
            onChange={handleChange('lastname')}
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
      <div className="btn-wrapper">
        <div className="sign-in-btn">
          <Button className="btn">Sign Up</Button>
        </div>
        <div className="gg-sign-in-btn">
          <Button className="btn">Google Sign In</Button>
        </div>
      </div>
      <div className="change-form">
        <Button onClick={props.handleChangeForm} className="change-form-btn">ALREADY HAVE AN ACCOUNT? SIGN IN</Button>
      </div>
    </Box>
  )
}
