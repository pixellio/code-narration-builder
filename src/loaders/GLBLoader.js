import { Canvas, render, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useState, useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';


export const GlbObjLoader = ({ url, position, scale, animationName }) => {
    const [glbObj, setGlbObjLoaderObj] = useState(null);
    const [animationMixer, setAnimationMixer] = useState(null);
    const gltfRef = useRef();
    const group = useRef();
    const clock = new THREE.Clock();

    const loadInit = () => {
        const loader = new GLTFLoader();

        loader.load(url,
            async function (glb) {
                setGlbObjLoaderObj(glb)
                
            }, (xhr) => {
                if (xhr.lengthComputable) {
                    const percentComplete = xhr.loaded / xhr.total * 100;
                    console.log('model ' + percentComplete.toFixed(2) + '% downloaded');
                }

            }, function (error) {
                console.log('>>>', error);
            });
    }



    useEffect(() => {
        loadInit();
    }, [])

    useEffect((x) => {
        if(glbObj) {
            
            const mesh = glbObj;
            const mixer = new THREE.AnimationMixer(glbObj.scene);
            const clips = mesh.animations;
            setAnimationMixer(mixer);
            const clip = THREE.AnimationClip.findByName( clips, animationName || 'Walk' );
            const action = mixer.clipAction( clip );

            console.log({ action}, { clips })
            action.play();
            mixer.update(clock.getDelta())
        }
    }, [glbObj, animationName]);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    useFrame((state, delta) => {
        if(animationMixer) {
            animationMixer.update(clock.getDelta())
        }

    })
    
    return glbObj ? <primitive object={glbObj.scene} scale={scale}  position={position} ref={gltfRef} /> : <primitive object={sphere} scale={[2, 2, 2]} ref={gltfRef} />;

}

export const LoadingFallback = () => null
