import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Add,
  Remove,
  Person,
  AccountCircle,
  Delete,
  ViewList,
  MedicalServices,
  Update,
  ExitToApp,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
// import AddAdmin from "../components/AddAdmin";
import RemoveAdmin from "../pages/RemoveAdmin";
import RemoveDoctor from "../pages/RemoveDoctor";
import RemovePatient from "../pages/RemovePatient";
import ViewDoctorRequest from "../pages/ViewDoctorRequest";
import AddPackage from "../pages/AddPackage";
import UpdatePackage from "../pages/UpdatePackage";
import DeletePackage from "../pages/DeletePackage";
import ChangePassword from "../pages/ChangePassword";
import AddAdmin from "./AddNewAdmin";

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
}));

const StyledDrawerPaper = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
}));

const StyledDrawerContainer = styled("div")(({ theme }) => ({
  overflow: "auto",
}));

const StyledContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  padding: theme.spacing(3),
  height: "100vh",
  marginLeft: `${drawerWidth}px`, // Adjusted to include the drawer width
  width: `calc(100% - ${drawerWidth}px)`, // Adjusted to subtract the drawer width
}));

const AdminHome = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = async () => {
    // Perform logout logic, e.g., calling a logout API
    // Redirect to the login page after logout
    navigate("/login");
  };

  const menuOptions = [
    { label: "Add Admin", icon: <Add />, to: "/admin/addAdmin" },
    { label: "Remove Admin", icon: <Remove />, to: "/admin/removeAdmin" },
    { label: "Remove Doctor", icon: <Person />, to: "/admin/removeDoctor" },
    {
      label: "Remove Patient",
      icon: <AccountCircle />,
      to: "/admin/removePatient",
    },
    {
      label: "View Doctor Request",
      icon: <ViewList />,
      to: "/admin/viewDoctorRequest",
    },
    {
      label: "Add Package",
      icon: <MedicalServices />,
      to: "/admin/addPackage",
    },
    { label: "Update Package", icon: <Update />, to: "/admin/updatePackage" },
    { label: "Delete Package", icon: <Delete />, to: "/admin/deletePackage" },
    { label: "Change Password", icon: <ExitToApp />, to: "/changePassword" },
  ];

  const renderComponent = () => {
    if (!selectedOption) {
      return (
        <Typography variant="h5">Select an option to view content.</Typography>
      );
    }

    switch (selectedOption.label) {
      case "Add Admin":
        return <AddAdmin />;
      case "Remove Admin":
        return <RemoveAdmin />;
      case "Remove Doctor":
        return <RemoveDoctor />;
      case "Remove Patient":
        return <RemovePatient />;
      case "View Doctor Request":
        return <ViewDoctorRequest />;
      case "Add Package":
        return <AddPackage />;
      case "Update Package":
        return <UpdatePackage />;
      case "Delete Package":
        return <DeletePackage />;
      case "Change Password":
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Welcome, Admin!
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent" paperProps={{ width: drawerWidth }}>
        <Toolbar />
        <StyledDrawerContainer>
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
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </StyledDrawerContainer>
      </StyledDrawer>
      <StyledContent>
        <Toolbar />
        <Container>{renderComponent()}</Container>
      </StyledContent>
    </Box>
  );
};

export default AdminHome;
