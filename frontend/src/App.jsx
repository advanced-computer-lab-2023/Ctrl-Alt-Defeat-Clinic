import PrescriptionList from "./components/PrescriptionList";
import "./App.css";
import HealthPackage from "./components/HealthPackages";
import SubscribeHealthPackage from "./components/SubscribeHealthPackages";
import SubscriptionStatus from "./components/SubscriptionStatus";
import CancelSubscription from "./components/CancelSubscription";
import AddFamilyMember from "./components/AddFamilyMembers";
import FamilyMembersViewer from "./components/FamilyMembersViewer";

function App() {
  return (
    <>
      <FamilyMembersViewer />
      <hr /> <hr />
      <AddFamilyMember />
      <hr /> <hr />
      <PrescriptionList />
      <hr /> <hr />
    </>
  );
}

export default App;
