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

  function createTextElements(textData) {
    const spacing = 0.2; // Adjust the desired horizontal spacing here
    const textElements = [];
    let xOffset = 0;

    textData.forEach((data, index) => {
      textElements.push(
        <Text
          key={index}
          position={[xOffset, 0, 0]}
          fontSize={0.4}
          {...data}
          font="./fonts/StickNoBills-Bold.ttf"
          WebkitTextFillColor="transparent"
          backgroundClip="text"
        >
          <meshStandardMaterial
            attach="material"
            color="#DECBA4"
            map={gradientTexture}
            transparent
          />
          {data.text}
        </Text>
      );

      xOffset += 1.5;
    });

    return textElements;
  }

  const textData = [
    { text: 'About', onClick: () => navigate('/about') },
    { text: 'Cv', onClick: () => navigate('/cv') },
    { text: 'Projects', onClick: () => navigate('/projects') },
    { text: 'Stack', onClick: () => navigate('/stack') },
  ];

  return <group position={[-7, -3.5, 0]}>{createTextElements(textData)}</group>;
};

export default GradientText;
