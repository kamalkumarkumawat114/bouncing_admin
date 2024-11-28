import React, { useState, useEffect } from 'react';
import './App.css';
import PhaserComponent from './PhaserComponent';

const ViewerPage = ({ socket }) => {
  const [clickHistory, setClickHistory] = useState([]);

  useEffect(() => {
    // Listen for button clicks from the admin
    socket.on('buttonClicked', (direction) => {
      setClickHistory((prev) => [...prev, direction]);

      // Inform Phaser to move the ball
      const phaserScene = window.phaserGame?.scene.scenes[0];
      if (phaserScene) {
        phaserScene.bounceTowards(direction);
      }
    });

    return () => {
      socket.off('buttonClicked');
    };
  }, [socket]);

  return (
    <div className="game-container">
      <h1>Viewer Page</h1>
      <PhaserComponent />
      <div className="click-history">
        <h3>Click History:</h3>
        <p>{clickHistory.join(' -> ')}</p>
      </div>
    </div>
  );
};

export default ViewerPage;
