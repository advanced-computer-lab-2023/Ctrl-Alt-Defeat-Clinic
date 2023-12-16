import PatientRegister from './pages/PatientRegister';
import DoctorRegister from './pages/DoctorRegister';
import AddAdmin from './components/AddAdmin';
import RemoveAdmin from './components/RemoveAdmin';
import RemoveDoctor from './components/RemoveDoctor';
import RemovePatient from './components/RemovePatient';
import ViewDoctorRequest from './components/ViewDoctorRequest';
import AddPackage from './components/AddPackage';
import DeletePackage from './components/DeletePackage';
import UpdatePackage from './components/UpdatePackage';
import UpdateDoctor from './components/updateDoctor';
import ViewAllPatients from './components/ViewAllPatients';
import SearchPatient from './components/SearchPatient';
import FamilyMembersViewer from './components/FamilyMembersViewer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminHome from './components/AdminHome';
import DoctorHome from './components/DoctorHome';
import PatientHome from './components/PatientHome';
import ViewAllDoctorAppointments from './components/ViewAllDoctorAppointments';
import ViewAllPatientAppointments from './components/ViewAllPatientAppointments';
import AddTimeSlot from './components/AddTimeSlot';
import ViewAvailableAppointments from './components/ViewAvailableAppointments';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HealthPackages from './components/HealthPackages';
import VerifyOTP from './components/VerifyOTP';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import UploadMedicalHistory from './components/UploadMedicalHistory';
import DeleteMedicalHistory from './components/DeleteMedicalHistory';
import MedicalHistoryViewer from './components/MedicalHistoryViewer';
import MedicalHistoryDoctorViewer from './components/MedicalHistoryDoctorViewer';
import './App.css';
import ScheduleFollowUpForm from './components/ScheduleFollowUp';
import AddUpdatePrescription from './components/AddUpdatePrescription';
import ViewSelectedPrescription from './components/ViewSelectedPrescription';
import DownloadPrescription from './components/DownloadPrescription';
import ViewAllDoctors from './components/ViewAllDoctors';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyOTP/:username" element={<VerifyOTP />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:username" element={<ResetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/patients/register" element={<PatientRegister />} />
          <Route path="/patients/healthPackages" element={<HealthPackages />} />
          <Route path="/patients/familyMembers" element={<FamilyMembersViewer />} />

          <Route path="/doctors/register" element={<DoctorRegister />} />
          <Route path="/admins/home" element={<AdminHome />} />
          <Route path="/admin/addAdmin" element={<AddAdmin />} />
          <Route path="/admin/removeAdmin" element={<RemoveAdmin />} />
          <Route path="/admin/removeDoctor" element={<RemoveDoctor />} />
          <Route path="/admin/removePatient" element={<RemovePatient />} />
          <Route path="/admin/viewDoctorRequest" element={<ViewDoctorRequest />} />

          <Route path="/doctors/downloadPrescription" element={<DownloadPrescription />} />
          <Route path="/admin/addPackage" element={<AddPackage />} />
          <Route path="/admin/updatePackage" element={<UpdatePackage />} />
          <Route path="/admin/deletePackage" element={<DeletePackage />} />
          <Route path="/doctors/home" element={<DoctorHome />} />
          <Route path="/doctors/update-my-info" element={<UpdateDoctor />} />
          <Route path="/doctors/my-patients" element={<ViewAllPatients />} />
          <Route path="/doctors/search" element={<SearchPatient />} />
          <Route path="/doctors/view-all-doctor-appointments" element={<ViewAllDoctorAppointments />} />

          <Route path="/doctors/add-time-slot" element={<AddTimeSlot />} />
          <Route path="/doctors/Prescriptions" element={<AddUpdatePrescription />} />
          <Route path="/doctors/scheduleFollowUp" element={<ScheduleFollowUpForm />} />

          <Route path="/doctors/view-patient-medical-history" element={<MedicalHistoryDoctorViewer />} />
          <Route path="/patients/home" element={<PatientHome />} />
          <Route path="/patients/view-all-patient-appointments" element={<ViewAllPatientAppointments />} />
          <Route path="/patients/view-all-available-appointments" element={<ViewAvailableAppointments />} />
          <Route path="/patients/upload" element={<UploadMedicalHistory />} />
          <Route path="/patients/delete" element={<DeleteMedicalHistory />} />
          <Route path="/patients/view-medical-history" element={<MedicalHistoryViewer />} />
          <Route path="/patients/viewSelectedPrescription" element={<ViewSelectedPrescription />} />
          <Route path="/patients/alldoctors" element={<ViewAllDoctors />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
