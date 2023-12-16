import React, { useEffect, useState } from "react";
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
import AssignmentIcon from "@mui/icons-material/Assignment";
import LockIcon from "@mui/icons-material/Lock";
import { Chat, Person } from "@mui/icons-material";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import ChangePassword from "./ChangePassword";
import AppointmentsPage from "./AppointmentsPage";
import MyPatientsPage from "./MyPatientsPage";
import UpdateInfoPage from "./UpdateInfoPage";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "axios";
import Contract from "../components/Contract";

function DoctorHome() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  const handleToggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8000/api/v1/auth/getMe", {
        withCredentials: true,
      });

      console.log(res.data.loggedIn);

      setLoggedIn(res.data.loggedIn);
    })();
  }, []);

  const handleLogout = () => {};

  const menuOptions = [
    { label: "Home", icon: <HomeIcon />, to: "/admin/addAdmin" },
    {
      label: "Appointments",
      icon: <AssignmentIcon />,
      to: "/doctors/",
    },
    {
      label: "My Patients",
      icon: <Person />,
      to: "/doctors/",
    },
    {
      label: "Chats",
      icon: <Chat />,
      to: "/doctors/",
    },
    {
      label: "Update My Info",
      icon: <FolderSharedIcon />,
      to: "/doctors/",
    },
    { label: "Change Password", icon: <PasswordIcon />, to: "/changePassword" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    if (!selectedOption) {
      return renderHome();
    }

    switch (selectedOption.label) {
      case "Appointments":
        return <AppointmentsPage />;
      case "My Patients":
        return <MyPatientsPage />;
      case "Change Password":
        return <ChangePassword />;
      case "Update My Info":
        return <UpdateInfoPage />;
      // case "Chats":
      // return <ChatPage.jsx />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "75%",
          backgroundColor: "#FFF",
          borderRadius: "5px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        home
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {loggedIn && loggedIn.registrationStatus === "partially accepted" ? (
        <div>
          <Contract
            username={loggedIn.username}
            hourlyRate={loggedIn.hourlyRate}
          />
        </div>
      ) : (
        <div>
          <div>
            <div
              style={{
                backgroundColor: "#0076c0",
                overflow: "hidden",
                display: "flex",
              }}
            >
              <IconButton onClick={handleToggleSideNav}>
                <MenuIcon sx={{ color: "white" }} />
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
            <Drawer
              anchor="left"
              open={showSideNav}
              onClose={handleToggleSideNav}
            >
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
      )}
    </div>
  );
}

export default DoctorHome;
