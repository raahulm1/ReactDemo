import React, { useState, useEffect } from 'react';

// Custom Hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  // Step 1: Read from localStorage on first render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Reading localStorage failed:', error);
      return initialValue;
    }
  });

  // Step 2: Write to localStorage whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('Writing to localStorage failed:', error);
    }
  }, [key, storedValue]);

  // Step 3: Sync across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn('Syncing localStorage change failed:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setStoredValue];
}

// Example Component using the Hook
function LocalStorage() {
  const [count, setCount] = useLocalStorage('counter', 0);

  return (
    <div style={{ textAlign: 'center'}}>
      <h2>LocalStorage Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>Reset</button>
    </div>
  );
}

export default LocalStorage;
