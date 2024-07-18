import React, { useState, useEffect } from "react";
import { api } from "../../api";
import { Typography, Box, Button } from "@mui/material";

function Protected({ token, refreshToken, handleTokenUpdate }) {
  const [message, setMessage] = useState("");

  const fetchProtectedData = async (currentToken) => {
    try {
      const response = await api.get("/api/protected", {
        headers: { Authorization: currentToken },
      });
      setMessage(response.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        try {
          const refreshResponse = await api.post("/api/auth/refresh-token", {
            refreshToken,
          });
          handleTokenUpdate(refreshResponse.data.accessToken, refreshToken);
          fetchProtectedData(refreshResponse.data.accessToken);
        } catch (refreshErr) {
          setMessage("Failed to refresh token");
        }
      } else {
        setMessage("Failed to fetch protected data");
      }
    }
  };

  useEffect(() => {
    fetchProtectedData(token);
  }, []);

  return (
    <Box mt={3}>
      <Typography variant="h5">Protected Data</Typography>
      <Typography>{message}</Typography>
      <Button
        onClick={() => fetchProtectedData(token)}
        variant="contained"
        color="secondary"
      >
        Refresh Data
      </Button>
    </Box>
  );
}

export default Protected;
