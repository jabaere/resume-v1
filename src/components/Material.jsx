import React from 'react';
import { PerspectiveCamera, Text, Text3D } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
const GradientText = () => {
  const navigate = useNavigate();

  const gradientTexture = new THREE.CanvasTexture(createGradientCanvas());

  function createGradientCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    const gradient = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, ' #3E5151');
    //gradient.addColorStop(0.5, '#a1d54f ');
    gradient.addColorStop(1, '#DECBA4 ');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  }

  return (
    <>
      <Text3D
        position={[8.5, 0, 5]}
        font="./Regular.json"
        WebkitTextFillColor="transparent"
        backgroundClip="text"
        size={0.5}
        onClick={() => navigate('/about')}
      >
        <meshStandardMaterial
          attach="material"
          color="#DECBA4"
          map={gradientTexture}
          transparent
        />
        About
      </Text3D>
      <Text3D
        position={[9, 1, 4]}
        font="./Regular.json"
        WebkitTextFillColor="transparent"
        backgroundClip="text"
        size={0.5}
        onClick={() => navigate('/cv')}
      >
        <meshStandardMaterial
          attach="material"
          color="#DECBA4"
          map={gradientTexture}
          transparent
        />
        Cv
      </Text3D>
      <Text3D
        position={[9, 2, 2]}
        font="./Regular.json"
        WebkitTextFillColor="transparent"
        backgroundClip="text"
        size={0.5}
        onClick={() => navigate('/projects')}
      >
        <meshStandardMaterial
          attach="material"
          color="#DECBA4"
          map={gradientTexture}
          transparent
        />
        Projects
      </Text3D>
      <Text3D
        position={[9, 3, 0]}
        font="./Regular.json"
        WebkitTextFillColor="transparent"
        backgroundClip="text"
        size={0.5}
        onClick={() => navigate('/stack')}
      >
        <meshStandardMaterial
          attach="material"
          color="#DECBA4"
          map={gradientTexture}
          transparent
        />
        Stack
      </Text3D>
    </>
  );
};

export default GradientText;
