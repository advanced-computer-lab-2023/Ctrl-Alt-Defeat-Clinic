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
  const [showModal, setShowModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [forFamilyMember, setForFamilyMember] = useState(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/v1/patients/viewDoctors', {
          withCredentials: true,
        });
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    const fetchFamilyMembers = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/api/v1/patients/viewFamilyMembers`, {
          withCredentials: true,
        });
        setFamilyMembers(Array.isArray(response.data) ? response.data : []);
        //console.log(response.data);
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };

    fetchDoctors();
    fetchFamilyMembers();
  }, []);

  const handleSelectAppointments = async () => {
    console.log(selectedDoctor.username, dateTime);
    try {
      const response = await Axios.post(
        `http://localhost:8000/api/v1/appointments/addAppointment?date=${dateTime}&doctor=${selectedDoctor.usermane}${
          !selectedFamilyMember ? '' : '&familyMember=' + selectedFamilyMember
        }`,
        {},
        { withCredentials: true }
      );

      console.log(response.data);

      alert('Appointment Booked Successfully');
      setShowModal(false);
      setOpenDialog(false);

      //console.log(`Selected appointment at ${dateTime} for patient ${selectedPatient} with ${selectedDoctor}`);
    } catch (error) {
      console.error('Error selecting appointment:', error);
      alert('Error selecting appointment');
    }
  };

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
          <DialogTitle style={{ fontWeight: 'bold' }}>{selectedDoctor && `Doctor Information`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedDoctor && (
                <>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Name:</strong> {selectedDoctor.name}
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Speciality:</strong> {selectedDoctor.speciality}
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Session Price:</strong> {selectedDoctor.sessionPrice}
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Affiliation:</strong> {selectedDoctor.affiliation}
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Educational Background:</strong> {selectedDoctor.educationalBackground}
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Available Time Slots:</strong>
                    {selectedDoctor.availableSlots.length > 0 ? (
                      <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '8px' }}>
                        {selectedDoctor.availableSlots.map((slot, index) => (
                          <li
                            key={index}
                            style={{
                              marginBottom: '8px',
                              border: '1px solid #ddd',
                              borderRadius: '5px',
                              padding: '8px',
                              backgroundColor: '#f8f8f8',
                              cursor: 'pointer',
                            }}
                          >
                            <strong>Date:</strong> {new Date(slot.start).toLocaleDateString()} <strong>Time:</strong>{' '}
                            {new Date(slot.start).toLocaleTimeString()} - {new Date(slot.end).toLocaleTimeString()}
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <Button
                                variant="outlined"
                                style={{ marginTop: '5px' }}
                                onClick={() => {
                                  setShowModal(true);
                                  setDateTime(slot.start);
                                  setForFamilyMember(false);
                                }}
                              >
                                Select For Me
                              </Button>
                              <Button
                                variant="outlined"
                                style={{ marginTop: '5px' }}
                                onClick={() => {
                                  setShowModal(true);
                                  setForFamilyMember(true);
                                  setDateTime(slot.start);
                                }}
                              >
                                Select For Family Member
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
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
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle style={{ fontWeight: 'bold' }}>Payment</DialogTitle>
          <DialogContent style={{ width: '400px' }}>
            {forFamilyMember && (
              <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px', marginTop: '5px' }}>
                <InputLabel id="member-label" style={{ backgroundColor: '#fff', padding: '0 10px' }}>
                  Select Family Member
                </InputLabel>
                <Select
                  labelId="member-label"
                  id="member-select"
                  value={selectedFamilyMember}
                  onChange={e => {
                    setSelectedFamilyMember(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {familyMembers.map((member, index) => (
                    <MenuItem key={index} value={member.name}>
                      {member.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Choose a Payment Method</label>
            <Button onClick={handleSelectAppointments} variant="outlined">
              Wallet
            </Button>
            <Button onClick={handleSelectAppointments} variant="outlined" style={{ marginLeft: '5px' }}>
              Credit Card
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default ViewAllDoctors;
