import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
// import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LockIcon from "@mui/icons-material/Lock";
import ChangePassword from "./ChangePassword";
import AddTimeSlot from "../components/AddTimeSlot";
import SearchPatient from "../components/SearchPatient";
import AppointmentsPage from "./AppointmentsPage";
import MyPatientsPage from "./MyPatientsPage";

function DoctorHome() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleToggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleLogout = () => {};

  const menuOptions = [
    { label: "Home", icon: <HomeIcon />, to: "/admin/addAdmin" },
    {
      label: "Appointments",
      icon: <AssignmentIcon />,
      to: "/doctors/add-time-slot",
    },
    {
      label: "My Patients",
      icon: <ShoppingCartIcon />,
      to: "/admin/removeDoctor",
    },
    { label: "Change Password", icon: <LockIcon />, to: "/changePassword" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    if (!selectedOption) {
      return (
        <Typography variant="h5">Select an option to view content.</Typography>
      );
    }

    switch (selectedOption.label) {
      case "Appointments":
        return <AppointmentsPage />;
      case "My Patients":
        return <MyPatientsPage />;
      case "Change Password":
        return <ChangePassword />;
      default:
        return null;
    }
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div>
        <div
          style={{
            backgroundColor: "#0076c0",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <IconButton onClick={handleToggleSideNav}>
            <MenuIcon />
          </IconButton>
          <Link
            to="/patients/home"
            style={{
              float: "left",
              display: "block",
              color: "#fff",
              padding: "14px 16px",
              textDecoration: "none",
            }}
          >
            CTRL-ALT-DEFEAT Clinic
          </Link>
        </div>
        <Drawer anchor="left" open={showSideNav} onClose={handleToggleSideNav}>
          <List>
            {menuOptions.map((option, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
            {/* <ListItem
              button
              component={Link}
              to="/patients/home"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/patients/medicines"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <LocalPharmacyIcon />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/patients/viewOrder"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="My Patients" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/patients/viewCart"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Update Account Info" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/changePassword"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItem> */}
            <hr className="hr" />
            <ListItem
              button
              component={Link}
              to="/"
              className="right"
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 46.4px)",
        }}
      >
        {renderComponent()}
      </Container>
    </div>
  );
}

export default DoctorHome;
