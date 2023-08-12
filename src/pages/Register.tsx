import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useUser from '@/hooks/useUser';
import {
  RegisterFormData,
  RegisterResponse,
  UserAxiosResponse,
  register,
} from '@/services/auth';

export default function Register() {
  const navigate = useNavigate();
  const user = useUser();
  if (user) {
    navigate('/dashboard');
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerData: RegisterFormData = {
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
    };
    register(registerData as RegisterFormData).then((r: AxiosResponse) => {
      const response: UserAxiosResponse = r.data;
      const registerResponse: RegisterResponse = {
        id: response.id,
        email: response.email,
        username: response.username,
        firstName: response.first_name,
        lastName: response.last_name,
        isActive: response.is_active,
        isStaff: response.is_staff,
        isSuperuser: response.is_superuser,
      };
      localStorage.setItem('user', JSON.stringify(registerResponse));
      localStorage.removeItem('activeViewID');
      navigate('/dashboard');
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="password"
                required
                fullWidth
                id="pawwsord"
                label="Password"
                type="password"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="password"
                required
                fullWidth
                id="pawwsord"
                label="Password Again"
                type="password"
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
