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
//import "./App.css";
import UpdateDoctor from "./components/updateDoctor";
import ViewAllPatients from "./components/ViewAllPatients";
import SearchPatient from "./components/SearchPatient";

function App() {
  return (
    <>
      <PatientRegister />
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
    </>
  );
}

export default App;
