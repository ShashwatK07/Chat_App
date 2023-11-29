import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import LoginForm from "./components/LoginForm";
import Messenger from "./components/Messenger";
import { AccountContext } from "./components/context/Account";

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const { setAccount } = useContext(AccountContext);
  const handleLoginSuccess = async () => {
    setShowLoginForm(false);
  };

  return (
    <Box>
      {showLoginForm ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Messenger />
      )}
    </Box>
  );
};

export default App;
