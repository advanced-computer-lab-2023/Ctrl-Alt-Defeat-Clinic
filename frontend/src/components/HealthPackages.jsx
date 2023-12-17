import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, Typography } from '@mui/material';
import TopNavigation from './TopNavigation';

const HealthPackage = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [patientHealthPackage, setPatientHealthPackage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/packages/getPackages');
        setHealthPackages(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const fetchPatientHealthPackage = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/patients/viewStatusOfHealthPackage', {
          withCredentials: true,
        });
        setPatientHealthPackage(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const subscribeToHealthPackage = async () => {
      const url = new URL(window.location.href);
      const queryParams = new URLSearchParams(url.search);
      const success = queryParams.get('success');
      const healthPackageId = queryParams.get('healthPackageId');
      if (!success) return;

      try {
        const response = await axios.post(
          'http://localhost:8000/api/v1/patients/subscribeToHealthPackage',
          { healthPackageId },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setPatientHealthPackage(response.data);
          window.alert('Subscription successful');
        }
        window.history.replaceState({}, document.title, '/patients/healthPackages');
      } catch (error) {
        console.error('Error during subscription:', error);
      }
    };

    fetchHealthPackages();
    fetchPatientHealthPackage();
    subscribeToHealthPackage();
  }, []);

  const handleSubscription = async () => {
    const healthPackageId = selectedPackage;
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/patients/createCheckoutSessionForHp',
        { healthPackageId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error during subscription:', error);
    }
  };

  const subscribeByWallet = async () => {
    const healthPackageId = selectedPackage;
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/patients/subscribeToHealthPackageByWallet',
        { healthPackageId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        if (response.data.error) {
          window.alert(response.data.error);
        } else {
          setPatientHealthPackage(response.data);
          window.alert('Subscription successful');
          setShowModal(false);
        }
      }
    } catch (error) {
      console.error('Error during subscription:', error.message);
    }
  };

  const CancelSubscription = async () => {
    const response = await axios.post(
      'http://localhost:8000/api/v1/patients/cancelHealthPackage',
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      setPatientHealthPackage(response.data);
      window.alert('Subscription cancelled successfully');
    } else {
      console.error('Error during cancellation');
    }
  };

  const handleClick = e => {
    if (patientHealthPackage.status === 'subscribed') {
      window.alert('You are already subscribed to a health package, please cancel your subscription first');
      return;
    }
    setSelectedPackage(e.target.id);
    setShowModal(true);
  };

  return (
    <>
      <TopNavigation link="/patients/home" />
      <div>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '10px', marginTop: '100px' }}>
          Health Packages Options
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontSize: '16px',
            color: '#444',
            textAlign: 'center',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: 'auto',
          }}
        >
          Enjoy the following discounts on all your doctor sessions and medicines by subscribing to one of our health
          packages today! You can also get discounts for your family members as well.
        </Typography>
        <List style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {healthPackages.map(healthpackage => (
            <div key={healthpackage._id}>
              <ListItem
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding: '0',
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'center',
                    backgroundColor: ' #ccc',
                    width: '100%',
                    padding: '10px',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  {healthpackage.name}
                </Typography>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '30px' }}>${healthpackage.price}</span>
                    /month
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: 'left' }}>
                    &#10003; {healthpackage.discounts.doctorSessionDiscount}% Doctor Session Discount
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: 'left' }}>
                    {' '}
                    &#10003; {healthpackage.discounts.medicineDiscount}% Medicine Discount
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: 'left' }}>
                    &#10003; {healthpackage.discounts.familySubscriptionDiscount}% Family Subscription Discount
                  </Typography>
                  <br />
                  {patientHealthPackage.id !== healthpackage._id ? (
                    <Button fullWidth variant="contained" id={healthpackage._id} onClick={handleClick}>
                      Subscribe
                    </Button>
                  ) : (
                    <div>
                      <Typography
                        variant="body1"
                        style={{
                          fontWeight: 'bold',
                          color: patientHealthPackage.status === 'subscribed' ? 'green' : 'red',
                          textTransform: 'uppercase',
                        }}
                      >
                        {patientHealthPackage.status}
                      </Typography>
                      <Typography variant="body1">
                        {patientHealthPackage.status === 'subscribed' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <span style={{ color: '#777', fontSize: '14px', fontStyle: 'italic' }}>
                              Renewal date is {patientHealthPackage.renewalDate.split('T')[0]}
                            </span>
                            <Button variant="outlined" onClick={CancelSubscription}>
                              Cancel subscription
                            </Button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <span style={{ color: '#777', fontSize: '14px', fontStyle: 'italic' }}>
                              End date was {patientHealthPackage.endDate.split('T')[0]}
                            </span>
                            <Button variant="outlined" id={healthpackage._id} onClick={handleClick}>
                              Subscribe again
                            </Button>
                          </div>
                        )}
                      </Typography>
                    </div>
                  )}
                </div>
              </ListItem>
            </div>
          ))}
        </List>
      </div>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Choose Payment Way</DialogTitle>
        <DialogContent>
          <Button onClick={subscribeByWallet}>Wallet</Button>
          <Button onClick={handleSubscription}>Credit Card</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HealthPackage;
