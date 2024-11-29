import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { gameConfig } from './gameConfig';

const PhaserComponent = () => {
  const phaserRef = useRef(null);

  useEffect(() => {
    window.phaserGame = new Phaser.Game(gameConfig);

    return () => {
      if (window.phaserGame) {
        window.phaserGame.destroy(true);
      }
    };
  }, []);

  return <div id="phaser-container" ref={phaserRef}></div>;
};

export default PhaserComponent;
