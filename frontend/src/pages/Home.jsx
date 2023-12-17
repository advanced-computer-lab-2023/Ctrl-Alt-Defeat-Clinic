import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import Patient from '../assets/patient.jpg';
import Doctor from '../assets/doctor.jpg';
import Logo from '../assets/logo.png';

const cards = [
  {
    id: 1,
    title: 'Register as a patient',
    description: 'Register as a patient and get access to our services',
    href: '/patients/register',
    imgSrc: Patient,
  },
  {
    id: 2,
    title: 'Register as a doctor',
    description: 'Register as a doctor and get access to our services',
    href: '/doctors/register',
    imgSrc: Doctor,
  },
];

export default function Album() {
  const navigate = useNavigate();

  return (
    <>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
          }}
        >
          <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={Logo} alt="logo" />
            {/* <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Welcome to El7a2ni Clinic
            </Typography> */}
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              your destination for exceptional healthcare. Our dedicated team ensures your well-being with personalized
              and compassionate services. Trust us for a warm and welcoming experience on your path to optimal health.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                paddingY: 2,
                paddingX: 6,
                bgcolor: '#0076c0',
                ':hover': { backgroundColor: '#0076c0' },
              }}
              onClick={() => {
                navigate('/login');
              }}
            >
              Log in now!
            </Button>
            <Divider flexItem style={{ marginTop: '40px' }}>
              OR
            </Divider>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card.id} md={6}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={card.imgSrc}
                  />
                  <CardContent sx={{ flexGrow: 1, padding: '20px' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 1, paddingY: 2, bgcolor: '#0076c0', ':hover': { backgroundColor: '#0076c0' } }}
                      onClick={() => {
                        navigate(card.href);
                      }}
                    >
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
