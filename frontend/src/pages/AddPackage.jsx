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

const AddPackage = () => {
  const [res, setRes] = useState(null);
  const [formData, setFormData] = useState({
    packageName: "",
    price: "",
    doctorDiscount: "",
    medicalDiscount: "",
    familyDiscount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.packageName,
      price: formData.price,
      discounts: {
        doctorSessionDiscount: formData.doctorDiscount,
        medicineDiscount: formData.medicalDiscount,
        familySubscriptionDiscount: formData.familyDiscount,
      },
    };
    const response = await axios.post(
      "http://localhost:8000/api/v1/packages/addPackage",
      data
    );
    console.log(response);
    setRes(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Package
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="packageNameInput"
            label="Package Name"
            variant="outlined"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="priceInput"
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            value={formData.price}
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
            label="Medicine Discount"
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
            Add Package
          </Button>

          {res && (
            <Box mt={2}>
              <Typography variant="body1" color="success">
                New package added
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AddPackage;
