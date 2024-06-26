import { useGLTF, PerspectiveCamera } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/Soldier.glb')
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera name="camera" fov={40} near={10} far={1000} position={[10, 0, 50]} />      
      <pointLight intensity={10} position={[100, 50, 100]} rotation={[-Math.PI / 2, 0, 0]} />
      <group position={[10, -5, 0]}>
        <mesh geometry={nodes.robot.geometry} material={materials.metal} />
        <mesh geometry={nodes.rocket.geometry} material={materials.wood} />
      </group>
    </group>
  )
}

useGLTF.preload('/Soldier.glb')