import React, { useState } from 'react';
import axios from 'axios';

const CancelSubscription = () => {
  const [loading, setLoading] = useState(false);

  // Define a function to handle health package cancellation
  const handleCancelSubscription = async () => {
    try {
      setLoading(true);

      // Make a request to your backend API to cancel the health package
      const response = await axios.post('http://localhost:8000/api/v1/patients/cancelHealthPackage',{},
       {withCredentials: true});

      // Check if the cancellation was successful
      if (response.status === 200) {
        console.log('Health package cancelled successfully');
        // Handle success, update UI, etc.
      }
    } catch (error) {
      console.error('Error during health package cancellation:', error);
      // Handle error, display error message, etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cancel Health Package Subscription</h2>
      <button onClick={handleCancelSubscription} disabled={loading}>
        {loading ? 'Cancelling...' : 'Cancel Health Package'}
      </button>
    </div>
  );
};

export default CancelSubscription;