import React from "react";
import { Button, FormControl, TextField } from "@mui/material";

export interface ILoginProps {}

export const Login = () => {
  return <>
    <FormControl>
      <TextField
        fullWidth 
        id="email"
        type='email' 
        label="email" 
      />
      <TextField
        fullWidth 
        id="password"
        type='password' 
        label="password" 
      />
      <Button variant='contained'>Submit</Button>
    </FormControl>
  </>;
};

export default Login;
