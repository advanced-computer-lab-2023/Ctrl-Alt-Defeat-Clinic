import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PatientImg from '../assets/patient-register.jpg';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function SignInSide() {
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const data = {
      username: formData.get('username'),
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      dateOfBirth: formData.get('dob'),
      gender: formData.get('gender'),
      mobileNumber: formData.get('phoneNumber'),
      nationalId: formData.get('nationalId'),
      emergencyContact: {
        fullName: formData.get('emergencyContactName'),
        mobileNumber: formData.get('emergencyContactName'),
        familyMembers: [],
      },
    };
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/patients/register', data);
      console.log(response.data);
      setMsg({
        type: 'success',
        text: 'success! Redirecting you to login...',
      });
      setTimeout(() => navigate('/login'), 3000);
    } catch (e) {
      console.log(e);
      setMsg({
        type: 'error',
        text: 'error! Please try again later',
      });
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${PatientImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#0076c0' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Patient Registration
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '15px' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField margin="normal" required fullWidth id="name" label="Name" name="name" autoComplete="name" />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <div style={{ position: 'relative', height: '56px', marginTop: '15px' }}>
                  <label
                    style={{
                      position: 'absolute',
                      fontSize: '0.75em',
                      top: '-8px',
                      left: '8px',
                      backgroundColor: '#fff',
                      padding: '0 3px',
                    }}
                  >
                    Date of birth
                  </label>
                  <input
                    type="date"
                    required
                    name="dob"
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <FormControl fullWidth style={{ marginTop: '15px' }}>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Gender" name="gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="tel"
                  type="number"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="nationalId"
                  label="National ID"
                  id="nationalId"
                  autoComplete="off"
                  type="number"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="emergencyContactName"
                  label="Emergency Contact Name"
                  id="emergencyContactName"
                  autoComplete="name"
                  style={{ gridColumn: '1 / span 2' }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="emergencyContactNumber"
                  label="Emergency Contact Number"
                  id="emergencyContactNumber"
                  type="number"
                  autoComplete="tel"
                  style={{ gridColumn: '1 / span 2' }}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, paddingY: 2, bgcolor: '#0076c0', ':hover': { backgroundColor: '#0076c0' } }}
              >
                Sign Up
              </Button>{' '}
              <Grid container>
                <Grid style={{ display: 'flex', gap: '3px', marginLeft: 'auto' }}>
                  <Typography variant="body2">Already have an account?</Typography>
                  <Link component={RouterLink} to="/login" variant="body2">
                    {'Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {msg && (
        <Snackbar
          open={Boolean(msg)}
          autoHideDuration={3000}
          onClose={() => setMsg()}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setMsg(null)} severity={msg.type} sx={{ width: '100%' }}>
            {msg.text}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
