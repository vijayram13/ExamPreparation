import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Protected from "./Protected";
import { Container, Typography, Box } from "@mui/material";

function Auth() {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const handleTokenUpdate = (newToken, newRefreshToken) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);
  };

  return (
    <Container maxWidth={"xs"}>
      <Box mt={5}>
        {
          <>
            <Register />
            {/* <Login handleTokenUpdate={handleTokenUpdate} /> */}
          </>
        }
      </Box>
    </Container>
  );
}

export default Auth;
