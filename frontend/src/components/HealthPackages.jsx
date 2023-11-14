import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HealthPackage = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [patientHealthPackage, setPatientHealthPackage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    // Make an HTTP GET request to API
    const fetchHealthPackages = async () => {
      axios
        .get("http://localhost:8000/api/v1/packages/getPackages")
        .then((response) => {
          setHealthPackages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };
    const fetchPatientHealthPackage = async () => {
      axios
        .get(
          "http://localhost:8000/api/v1/patients/viewStatusOfHealthPackage",
          { withCredentials: true }
        )
        .then((response) => {
          setPatientHealthPackage(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    const subscribeToHealthPackage = async () => {
      const url = new URL(window.location.href);
      const queryParams = new URLSearchParams(url.search);
      const success = queryParams.get("success");
      const healthPackageId = queryParams.get("healthPackageId");
      if (!success) return;

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/patients/subscribeToHealthPackage",
          { healthPackageId },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setPatientHealthPackage(response.data);
          window.alert("Subscription successful");
        }
        window.history.replaceState(
          {},
          document.title,
          "/patients/healthPackages"
        );
      } catch (error) {
        console.error("Error during subscription:", error);
      }
    };

    fetchHealthPackages();
    fetchPatientHealthPackage();
    subscribeToHealthPackage();
  }, []);

  const handleSubscription = async () => {
    const healthPackageId = selectedPackage;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/patients/createCheckoutSessionForHp",
        { healthPackageId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  const subscribeByWallet = async () => {
    const healthPackageId = selectedPackage;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/patients/subscribeToHealthPackageByWallet",
        { healthPackageId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        if (response.data.error) {
          window.alert(response.data.error);
        } else {
          setPatientHealthPackage(response.data);
          window.alert("Subscription successful");
          setShowModal(false);
        }
      }
    } catch (error) {
      console.error("Error during subscription:", error.message);
    }
  };

  const CancelSubscription = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/patients/cancelHealthPackage",
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      setPatientHealthPackage(response.data);
      window.alert("Subscription cancelled successfully");
    } else {
      console.error("Error during cancellation");
    }
  };

  const handleClick = (e) => {
    if (patientHealthPackage.status === "subscribed") {
      window.alert(
        "You are already subscribed to a health package, please cancel your subscription first"
      );
      return;
    }
    setSelectedPackage(e.target.id);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <h2>Health Package Options</h2>
        <ul>
          {healthPackages.map((healthpackage) => (
            <div key={healthpackage._id}>
              <li>
                <strong>{healthpackage.name}</strong>
                <p>Price: ${healthpackage.price}</p>
                <p>
                  Doctor Session Discount:{" "}
                  {healthpackage.discounts.doctorSessionDiscount}%
                </p>
                <p>
                  Medicine Discount: {healthpackage.discounts.medicineDiscount}%
                </p>
                <p>
                  Family Subscription Discount:{" "}
                  {healthpackage.discounts.familySubscriptionDiscount}%
                </p>
                <br />
                {patientHealthPackage.id !== healthpackage._id ? (
                  <button id={healthpackage._id} onClick={handleClick}>
                    subscribe
                  </button>
                ) : (
                  <>
                    <p>Subscription Status: {patientHealthPackage.status}</p>
                    <p>
                      {patientHealthPackage.status === "subscribed" ? (
                        <>
                          Subscription renewal date is{" "}
                          {patientHealthPackage.renewalDate.split("T")[0]}
                          <br />
                          <br />
                          <button onClick={CancelSubscription}>
                            cancel subscription
                          </button>
                        </>
                      ) : (
                        <>
                          Subscription end date was{" "}
                          {patientHealthPackage.endDate.split("T")[0]}
                          <br />
                          <br />
                          <button id={healthpackage._id} onClick={handleClick}>
                            subscribe again
                          </button>
                        </>
                      )}
                    </p>
                  </>
                )}
              </li>
              <hr />
            </div>
          ))}
        </ul>
      </div>
      <dialog open={showModal} className="modal">
        <h2>Choose Payment Way</h2>
        <button onClick={subscribeByWallet}>Wallet</button>
        <br />
        <br />
        <button onClick={handleSubscription}>Credit Card</button>
        <br />
        <br />
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </dialog>
      <Link to="/patients/home">Home</Link>
    </>
  );
};

export default HealthPackage;
