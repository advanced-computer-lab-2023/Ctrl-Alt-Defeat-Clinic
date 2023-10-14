const SubscriptionStatus = () => {
  const subscriptionStatus = [
    {
      id: 1,
      packageName: "Package A",
      subscribed: true,
      renewalDate: "2023-12-31",
    },
    {
      id: 2,
      packageName: "Package B",
      subscribed: false,
      endDate: "2023-09-30",
    },
    // Add more subscription status data here
  ];

  return (
    <div>
      <h2>Subscription Status</h2>
      <ul>
        {subscriptionStatus.map((subscription) => (
          <li
            key={subscription.id}
            className={subscription.subscribed ? "renewed" : "canceled"}
          >
            <strong>{subscription.packageName}</strong>
            {subscription.subscribed ? (
              <p>Subscribed until: {subscription.renewalDate}</p>
            ) : (
              <p>Unsubscribed / Canceled on: {subscription.endDate}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionStatus;
