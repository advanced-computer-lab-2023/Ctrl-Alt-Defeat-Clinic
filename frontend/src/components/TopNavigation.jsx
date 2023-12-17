import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import Axios from 'axios';
import '../Css/TopNavigation.css';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HomeIcon from '@mui/icons-material/Home';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';

const TopNavigation = props => {
  const { link } = props;

  const [showSideNav, setShowSideNav] = useState(false);

  const handleToggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleLogout = async () => {
    const response = await Axios.get('http://localhost:8000/api/v1/auth/logout', { withCredentials: true });
    console.log(response.data);
  };

  return (
    <div>
      <div className="top-navigation">
        <div className="drawerIcon-container">
          <IconButton onClick={handleToggleSideNav}>
            <MenuIcon />
          </IconButton>
        </div>
        <Link to={link}>
          <div className="logo-container">
            <img src="../src/assets/logo.png" alt="Pharmacy Logo" className="logo" />
          </div>
        </Link>
        <div className="account-icon-container">
          <Link to="/patients/home">
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <Drawer anchor="left" open={showSideNav} onClose={handleToggleSideNav}>
        <List>
          <ListItem button component={Link} to="/patients/home" onClick={handleToggleSideNav}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/patients/alldoctors" onClick={handleToggleSideNav}>
            <ListItemIcon>
              <VaccinesOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="doctors" />
          </ListItem>
          <ListItem button component={Link} to="/patients/healthPackages" onClick={handleToggleSideNav}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Health Packages" />
          </ListItem>
          <ListItem button component={Link} to="/patients/account" onClick={handleToggleSideNav}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account Details" />
          </ListItem>
          <ListItem button component={Link} to="/changePassword" onClick={handleToggleSideNav}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Change password" />
          </ListItem>
          <hr className="hr" />
          <ListItem button component={Link} to="/" className="right" onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

TopNavigation.propTypes = {
  link: PropTypes.string.isRequired,
};

export default TopNavigation;
