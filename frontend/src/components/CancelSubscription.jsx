const CancelSubscription = () => {
  const handleCancelSubscription = (subscriptionId) => {
    // Implement the subscription cancellation logic here
    console.log(`Canceled subscription with ID: ${subscriptionId}`);
    // You can update the UI or perform any other actions as needed
  };

  return (
    <div>
      <h2>Cancel Subscription</h2>
      <button onClick={() => handleCancelSubscription(1)}>
        Cancel Subscription 1
      </button>
      <button onClick={() => handleCancelSubscription(2)}>
        Cancel Subscription 2
      </button>
      {/* Add more buttons for other subscriptions if needed */}
    </div>
  );
};

export default CancelSubscription;
