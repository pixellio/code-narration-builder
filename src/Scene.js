import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, AmbientLight, DirectionalLight } from '@react-three/cannon';
// import { GLTFLoader } from '@react-three/gltfjsx';
import * as THREE from 'three';
import socketIOClient from 'socket.io-client';

const Scene = () => {
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);

  // Connect to Socket.io server (if applicable)
  useEffect(() => {
    if (!socket) {
      const newSocket = socketIOClient('http://localhost:your-server-port'); // Replace with your server URL
      setSocket(newSocket);
    }

    // Handle events from the server (if applicable)
    socket.on('update-scene', (data) => {
      // Update scene elements based on data received from server
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // Animate the scene on each frame
  useFrame(() => {
    if (canvasRef.current) {
      const renderer = canvasRef.current.renderer;
      renderer.render();
    }
  });

  return (
    <Canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} />

      {/* Add your scene objects here, using the Object component or manually */}
      <Object modelPath="/public/Soldier.glb'" /> {/* Example */}

    </Canvas>
  );
};

export default Scene;