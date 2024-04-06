import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Sky, OrbitControls } from "@react-three/drei"
import Grass from "./Grass"
import {GlbObjLoader, LoadingFallback } from "./loaders/GLBLoader"

export default function App() {
  return (
    <div style={{height:'100vh'}}>
    <Canvas camera={{ position: [15, 15, 10] }}>
      <Sky azimuth={1} inclination={0.6} distance={1000} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Grass />
        
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
              
      <GlbObjLoader
            // ref={characterRef}
            url='https://webgl-content.s3.ap-south-1.amazonaws.com/guard.glb'
            animationName='Walk'
            position={[0, 0, 0]}
            scale={2.5}
          />
      </Suspense>
      <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
    </Canvas>
    </div>
  )
}

// import React, { useState, useEffect } from 'react';
// import Scene from './Scene';
// import Object from './Object';

// function App() {
//   // Socket connection state (optional if server is used)
//   const [socket, setSocket] = useState(null);

//   // State for user input (e.g., object movement)
//   const [userInput, setUserInput] = useState(null);

//   // useEffect(() => {
//   //   if (!socket) {
//   //     const newSocket = io('http://localhost:your-server-port'); // Replace with your server URL
//   //     setSocket(newSocket);
//   //   }

//   //   return () => {
//   //     if (socket) {
//   //       socket.disconnect();
//   //     }
//   //   };
//   // }, [socket]);

//   // Function to handle user input and potentially send it to the server (if applicable)
//   const handleUserInput = (event) => {
//     setUserInput(event.target.value); // Update state with user input
//     if (socket) {
//       socket.emit('user-input', event.target.value); // Send input to server (if using Socket.io)
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>3D Project with Socket.io and Three.js</h1>
//         {/* {socket && <p>Connected to server</p>}  */}
//         {/* Optional connection status display */}
//         <input type="text" placeholder="User Input" 
//         // onChange={handleUserInput} 
//         /> 
//         {/* Optional user input field */}
//       </header>
//       {/* <Scene />  */}
//       {/* Render the 3D scene */}
//     </div>
//   );
// }

// export default App;
