import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";

const UpdatePackage = () => {
  const [res, setRes] = useState(null);
  const [formData, setFormData] = useState({
    packageName: "",
    updatedName: "",
    updatedPrice: "",
    doctorDiscount: "",
    medicalDiscount: "",
    familyDiscount: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.updatedName,
      price: formData.updatedPrice,
      discounts: {
        doctorSessionDiscount: formData.doctorDiscount,
        medicineDiscount: formData.medicalDiscount,
        familySubscriptionDiscount: formData.familyDiscount,
      },
    };
    const response = await axios.put(
      "http://localhost:8000/api/v1/packages/updatePackage/" +
        formData.packageName,
      data
    );
    console.log(response);
    setRes(response);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h5">
          Update Package
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="packageNameInput"
          label="Package Name to Update"
          variant="outlined"
          name="packageName"
          value={formData.packageName}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          id="updatedNameInput"
          label="Updated Name"
          variant="outlined"
          name="updatedName"
          value={formData.updatedName}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          id="updatedPriceInput"
          label="Updated Price"
          variant="outlined"
          type="number"
          name="updatedPrice"
          value={formData.updatedPrice}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          id="doctorDiscountInput"
          label="Doctor Session Discount"
          variant="outlined"
          type="number"
          name="doctorDiscount"
          value={formData.doctorDiscount}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          id="medicalDiscountInput"
          label="Medical Discount"
          variant="outlined"
          type="number"
          name="medicalDiscount"
          value={formData.medicalDiscount}
          onChange={handleChange}
          required
        />
        <TextField
          margin="normal"
          fullWidth
          id="familyDiscountInput"
          label="Family Subscription Discount"
          variant="outlined"
          type="number"
          name="familyDiscount"
          value={formData.familyDiscount}
          onChange={handleChange}
          required
        />
        <Button type="submit" fullWidth variant="contained">
          Update Package
        </Button>

        {res && (
          <Box mt={2}>
            <Typography variant="body1" color="success">
              Package updated
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UpdatePackage;
