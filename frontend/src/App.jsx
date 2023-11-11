import PatientRegister from "./components/PatientRegister";
import DoctorRegister from "./components/DoctorRegister";
import AddAdmin from "./components/AddAdmin";
import RemoveAdmin from "./components/RemoveAdmin";
import RemoveDoctor from "./components/RemoveDoctor";
import RemovePatient from "./components/RemovePatient";
import ViewDoctorRequest from "./components/ViewDoctorRequest";
import AddPackage from "./components/AddPackage";
import DeletePackage from "./components/DeletePackage";
import UpdatePackage from "./components/UpdatePackage";
import ViewAllDoctors from "./components/ViewAllDoctors";
import FilterAppointments from "./components/FilterAppointments";
import UpdateDoctor from "./components/updateDoctor";
import ViewAllPatients from "./components/ViewAllPatients";
import SearchPatient from "./components/SearchPatient";
import PrescriptionList from "./components/PrescriptionList";
import AddFamilyMember from "./components/AddFamilyMembers";
import FamilyMembersViewer from "./components/FamilyMembersViewer";
import DoctorList from "./components/DoctorList";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import DoctorHome from "./components/DoctorHome";
import PatientHome from "./components/PatientHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthPackages from "./components/HealthPackages";
import Contract from "./components/Contract";
import SubscribeHealthPackages from "./components/SubscribeHealthPackages";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients/register" element={<PatientRegister />} />
          <Route path="/patients/healthPackages" element={<HealthPackages />} />
          <Route
            path="/patients/familyMembers"
            element={<FamilyMembersViewer />}
          />

          <Route path="/doctors/register" element={<DoctorRegister />} />
          <Route path="/admins/home" element={<AdminHome />} />
          <Route path="/admin/addAdmin" element={<AddAdmin />} />
          <Route path="/admin/removeAdmin" element={<RemoveAdmin />} />
          <Route path="/admin/removeDoctor" element={<RemoveDoctor />} />
          <Route path="/admin/removePatient" element={<RemovePatient />} />
          <Route
            path="/admin/viewDoctorRequest"
            element={<ViewDoctorRequest />}
          />
          <Route path="/admin/addPackage" element={<AddPackage />} />
          <Route path="/admin/updatePackage" element={<UpdatePackage />} />
          <Route path="/admin/deletePackage" element={<DeletePackage />} />
          <Route path="/doctors/home" element={<DoctorHome />} />
          <Route path="/doctors/update-my-info" element={<UpdateDoctor />} />
          <Route path="/doctors/my-patients" element={<ViewAllPatients />} />
          <Route path="/doctors/search" element={<SearchPatient />} />
          <Route path="/patients/home" element={<PatientHome />} />
        </Routes>
      </BrowserRouter>
      {/* <PatientRegister />
      <hr />
      <DoctorRegister />
      <hr />
      <AddAdmin />
      <hr />
      <RemoveAdmin />
      <hr />
      <RemoveDoctor />
      <hr />
      <RemovePatient />
      <hr />
      <ViewDoctorRequest />
      <hr />
      <AddPackage />
      <hr />
      <DeletePackage />
      <hr />
      <UpdatePackage />
      <hr />
      <ViewAllDoctors />
      <hr />
      <FilterAppointments />
      <hr />
      <UpdateDoctor />
      <hr />
      <ViewAllPatients />
      <hr />
      <SearchPatient />
      <hr />
      <FamilyMembersViewer />
      <hr />
      <AddFamilyMember />
      <hr />
      <PrescriptionList />
      <hr />
      <DoctorList />
      <hr /> */}
      {/* <hr />
      <HealthPackages />
      <hr /> */}

      {/* <hr />
      <SubscribeHealthPackages />
      <hr /> */}
    </>
  );
}

export default App;
