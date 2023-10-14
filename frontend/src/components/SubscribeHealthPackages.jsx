const SubscribeHealthPackage = () => {
  const handleSubscribe = (packageId) => {
    // Implement the subscription logic here
    console.log(`Subscribed to health package with ID: ${packageId}`);
  };

  return (
    <div>
      <h2>Subscribe to Health Package</h2>
      <button onClick={() => handleSubscribe(1)}>
        Subscribe to Basic Health Package
      </button>
      <button onClick={() => handleSubscribe(2)}>
        Subscribe to Premium Health Package
      </button>
      {/* Add more buttons for other health packages if needed */}
    </div>
  );
};

export default SubscribeHealthPackage;
