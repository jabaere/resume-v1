/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 scene.gltf --transform 
Files: scene.gltf [4.51KB] > scene-transformed.glb [104.68KB] (-2221%)
Author: Paul (https://sketchfab.com/paul_paul_paul)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/free-skybox-autumn-forest-3ba29976640c4b26a66d6cea0556b7d6
Title: FREE - SkyBox Autumn Forest
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function AutumnForest(props) {
  const group = useRef();

  const { nodes, materials } = useGLTF(
    './models/autumnForest/scene-transformed.glb'
  );
  //controll animation speed
  const animationSpeed = 0.4;

  //starter animation
  useFrame((_, delta) => {
    group.current.position.z -= delta * animationSpeed;
    group.current.rotation.y += delta * 0.04;
    if (group.current.position.z <= -2) {
      group.current.position.z = -2;
    }

    if (group.current.rotation.y > 16) {
      group.current.rotation.y = 16;
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      position={props.position}
      rotation={props.rotate}
      ref={group}
    >
      <mesh
        geometry={nodes.Sphere__0.geometry}
        material={materials['Scene_-_Root']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={20}
      />
    </group>
  );
}

useGLTF.preload('./models/autumnForest/scene-transformed.glb');