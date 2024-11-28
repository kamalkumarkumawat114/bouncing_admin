import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import AdminPage from './AdminPage';
import ViewerPage from './ViewerPage';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    socket.on('role', (assignedRole) => {
      setRole(assignedRole);
    });

    return () => {
      socket.off('role');
    };
  }, []);

  return (
    <div>
      {role === 'admin' && <AdminPage socket={socket} />}
      {role === 'viewer' && <ViewerPage socket={socket} />}
      {!role && <p>Loading...</p>}
    </div>
  );
}

export default App;
