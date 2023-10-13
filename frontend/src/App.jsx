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
import SearchForDoctors from "./components/SearchForDoctors";
import FilterAppointments from "./components/FilterAppointments";
import FilterDoctors from "./components/FilterDoctors";
//import "./App.css";

function App() {
  return (
    <>
      <PatientRegister />
      <hr></hr>
      <DoctorRegister />
      <hr></hr>
      <AddAdmin />
      <hr></hr>
      <RemoveAdmin />
      <hr></hr>
      <RemoveDoctor />
      <hr></hr>
      <RemovePatient />
      <hr></hr>
      <ViewDoctorRequest />
      <hr></hr>
      <AddPackage />
      <hr></hr>
      <DeletePackage />
      <hr></hr>
      <UpdatePackage />
      <hr></hr>
      <ViewAllDoctors />
      <hr></hr>
      <SearchForDoctors />
      <hr></hr>
      <FilterAppointments />
      <hr></hr>
      <FilterDoctors />
    </>
  );
}

export default App;
