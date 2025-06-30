import React, { useState } from 'react';

function SimCount() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Simple Counter</h2>
      <h1>{count}</h1>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)} style={{ marginLeft: '10px' }}>+</button>
    </div>
  );
}

export default SimCount;
