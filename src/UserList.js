import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const useApi = (url, method = 'GET', requestData = null, trigger = true) => {
  const [data, setData] = useState(null);           // State to hold response data
  const [error, setError] = useState(null);         // State to hold any error
  const [loading, setLoading] = useState(false);    // State to show loading
  const controllerRef = useRef(null);               // Ref to hold AbortController

  useEffect(() => {
    if (!trigger) return; // only run if trigger is true (helps in lazy fetch)

    const fetchData = async () => {
      setLoading(true);     // Start loading
      setError(null);       // Clear previous errors
      controllerRef.current = new AbortController(); // Create new AbortController

      try {
        const response = await axios({
          url,
          method,
          data: requestData,
          signal: controllerRef.current.signal, // Attach cancel signal
        });
        setData(response.data);  // Set data from response
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message); // Log cancellation
        } else {
          setError(err);       // Set error if not cancelled
        }
      } finally {
        setLoading(false);     // Always stop loading
      }
    };

    fetchData();

    // Cleanup function to cancel API if component unmounts
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort(); // Cancel the request
      }
    };
  }, [url, method, requestData, trigger]); // Rerun if any dependency changes

  return { data, error, loading }; // Expose data to component
};

const UserList = () => {
  const { data, error, loading } = useApi('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      <h3>Use API</h3>
      {data && data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
