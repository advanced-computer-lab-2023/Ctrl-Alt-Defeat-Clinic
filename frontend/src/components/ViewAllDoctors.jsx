import { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Axios from 'axios';
import TopNavigation from './TopNavigation';

function ViewAllDoctors() {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterSpeciality, setFilterSpeciality] = useState('');
  const [filterDateTime, setFilterDateTime] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/v1/patients/viewDoctors');
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSpecialityChange = e => {
    setFilterSpeciality(e.target.value);
  };

  const handleRowClick = doctor => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const isDateTimeInRange = (dateTime, start, end) => {
    console.log(new Date(dateTime), new Date(start), new Date(end));
    return new Date(dateTime) >= new Date(start) && new Date(dateTime) <= new Date(end);
  };

  const filteredDoctors = userInfo.filter(
    user =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.speciality.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterSpeciality === '' || user.speciality.toLowerCase() === filterSpeciality.toLowerCase()) &&
      (!filterDateTime || user.availableSlots.some(slot => isDateTimeInRange(filterDateTime, slot.start, slot.end)))
  );

  const specialities = [...new Set(userInfo.map(user => user.speciality))];

  return (
    <>
      <TopNavigation link="/patients/home" />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom style={{ margin: '50px 0' }}>
          List of All Doctors
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <TextField
            label="Search by Name or Speciality"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px' }}
          />
          <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel id="speciality-label" style={{ backgroundColor: 'rgb(247, 247, 247)', padding: '0 10px' }}>
              Filter by Speciality
            </InputLabel>
            <Select
              labelId="speciality-label"
              id="speciality-select"
              value={filterSpeciality}
              onChange={handleSpecialityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {specialities.map((speciality, index) => (
                <MenuItem key={index} value={speciality}>
                  {speciality}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Filter by Date and Time"
            variant="outlined"
            fullWidth
            type="datetime-local"
            value={filterDateTime}
            onChange={e => setFilterDateTime(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
        </div>
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: '#0076c0', color: 'white' }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #eee' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #eee' }}>Speciality</TableCell>
                  <TableCell style={{ fontWeight: 'bold', border: '1px solid #eee' }}>Session Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDoctors.map((user, index) => (
                  <TableRow key={index} onClick={() => handleRowClick(user)} style={{ cursor: 'pointer' }}>
                    <TableCell style={{ border: '1px solid #eee' }}>{user.name}</TableCell>
                    <TableCell style={{ border: '1px solid #eee' }}>{user.speciality}</TableCell>
                    <TableCell style={{ border: '1px solid #eee' }}>{user.sessionPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Doctor Details Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedDoctor && `Doctor Information`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedDoctor && (
                <>
                  <strong>Name:</strong> {selectedDoctor.name}
                  <br />
                  <strong>Speciality:</strong> {selectedDoctor.speciality}
                  <br />
                  <strong>Session Price:</strong> {selectedDoctor.sessionPrice}
                  <br />
                  <strong>Affiliation:</strong> {selectedDoctor.affiliation}
                  <br />
                  <strong>Educational Background:</strong> {selectedDoctor.educationalBackground}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default ViewAllDoctors;
