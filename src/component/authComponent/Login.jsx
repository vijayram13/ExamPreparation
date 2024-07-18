import React, { useState } from 'react';
import {api} from '../../api';
import { TextField, Button, Typography, Box } from '@mui/material';
import { red } from '@mui/material/colors';

const color = red[500];
function Login({ handleTokenUpdate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', { username, password });
      console.log(response.data.accessToken);
      console.log(response.data.refreshToken);
      handleTokenUpdate(response.data.accessToken, response.data.refreshToken);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}  mt={3} className='bg-sky-200 p-3 rounded'>
      <Typography variant="h5" gutterBottom color={'primary'}>Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        size='small'
        margin="normal"
        color= "info"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        size='small'
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
    </Box>
  );
}

export default Login;
