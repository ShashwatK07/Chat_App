import React, { useContext, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { loginUser } from "./service/api";
import { AccountContext } from "./context/Account";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccount } = useContext(AccountContext);

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email: email, password: password });
      console.log(res)
      setAccount(res)
      onLoginSuccess(res);
    } catch (err) {
      console.error("Error while logging in:", err.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
