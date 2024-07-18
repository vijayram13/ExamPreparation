import React, { useState } from 'react';
import {api} from '../../api';
import { TextField, Button, Typography, Box } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/register', { username, password });
      alert('User registered successfully');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={3} className='bg-sky-200 p-3 rounded'>
      <Typography variant="h5" gutterBottom color={'primary'}>Register</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        size='small'
        
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
      <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
    </Box>
  );
}

export default Register;
