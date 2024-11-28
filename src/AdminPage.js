import React, { useState } from 'react';
import './App.css';
import PhaserComponent from './PhaserComponent';

const AdminPage = ({ socket }) => {
  const [clickHistory, setClickHistory] = useState([]);

  const handleButtonClick = (direction) => {
    // Update click history
    setClickHistory((prev) => [...prev, direction]);

    // Notify server about button click
    socket.emit('buttonClick', direction);

    // Inform Phaser to move the ball
    const phaserScene = window.phaserGame?.scene.scenes[0];
    if (phaserScene) {
      phaserScene.bounceTowards(direction);
    }
  };

  return (
  <>
   <h1>Admin Page</h1>
    <div className="game-container">
     
      <div className="top-buttons">
        <button onClick={() => handleButtonClick('topLeft')}>Top 1</button>
        <button onClick={() => handleButtonClick('topRight')}>Top 2</button>
      </div>

      <div className="middle-section">
        <div className="side-buttons left">
          <button onClick={() => handleButtonClick('leftTop')}>Left 1</button>
          <button onClick={() => handleButtonClick('leftBottom')}>Left 2</button>
        </div>
        

        <PhaserComponent />

        <div className="side-buttons right">
          <button onClick={() => handleButtonClick('rightTop')}>Right 1</button>
          <button onClick={() => handleButtonClick('rightBottom')}>Right 2</button>
        </div>
      </div>

      <div className="bottom-buttons">
        <button onClick={() => handleButtonClick('bottomLeft')}>Bottom 1</button>
        <button onClick={() => handleButtonClick('bottomRight')}>Bottom 2</button>
      </div>

      <div className="click-history">
        <h3>Click History:</h3>
        <p>{clickHistory.join(' -> ')}</p>
      </div>
    </div>
    </>
  );

};


export default AdminPage;
