import PatientRegister from "./components/PatientRegister";
import DoctorRegister from "./components/DoctorRegister";
import AddAdmin from "./components/AddAdmin";
import RemoveUser from "./components/RemoveUser";
import ViewDoctorRequest from "./components/ViewDoctorRequest";
import AddPackage from "./components/AddPackage";
import DeletePackage from "./components/DeletePackage";
import UpdatePackage from "./components/UpdatePackage";
import "./App.css";

function App() {
  return (
    <>
      <PatientRegister />
      <hr></hr>
      <DoctorRegister />
      <hr></hr>
      <AddAdmin />
      <hr></hr>
      <RemoveUser />
      <hr></hr>
      <ViewDoctorRequest />
      <hr></hr>
      <AddPackage />
      <hr></hr>
      <DeletePackage />
      <hr></hr>
      <UpdatePackage />
    </>
  );
}

export default App;
