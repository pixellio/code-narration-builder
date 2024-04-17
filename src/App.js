import React, { Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Sky, OrbitControls } from "@react-three/drei"
import Grass from "./Grass"
import {GlbObjLoader, LoadingFallback } from "./loaders/GLBLoader"
import { socket } from './connections/socket';
import AnimationSwitch, {animationSwitchAction} from "./components/aniamtionSwitch"
import {useSelector, useStore} from 'react-redux';
import thunk from 'redux-thunk';
export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const animatonAction = useSelector(state => state.charaterActions.action)
  const reduxStore = useStore();
 
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log({ value})
      if (["Run","Walk", "Dance"].includes(value)) {
       reduxStore.dispatch(animationSwitchAction(value))
      }
      
      //setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat message', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat message', onFooEvent);
    };
  }, []);

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
            animationName={animatonAction}
            position={[0, 0, 0]}
            scale={2.5}
          />
      </Suspense>
      <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
    </Canvas>
    <AnimationSwitch/>
    </div>
  )
}
