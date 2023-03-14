import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  Scroll,
  ScrollControls,
  Html,
  Environment,
  Float,
  Cloud,
} from '@react-three/drei';

import { Dragon } from '../models/Dragon';

import {
  Bloom,
  EffectComposer,
  Vignette,
  DepthOfField,
} from '@react-three/postprocessing';
import { CirclesWithBar } from 'react-loader-spinner';

export const Home = () => {
  const container = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.9,
        duration: 1.5,
        ease: 'easeOut',
      },
    },
    exit: {
      y: '-100vw',
      transition: {
        ease: 'easeInOut',
        delay: 1.5,
        duration: 1.5,
      },
    },
  };

  // const ball = {
  //   initial: {
  //     x: window.innerWidth > 780 ? -350 : -150,
  //   },
  //   visible: {
  //     x: window.innerWidth > 780 ? 350 : 100,
  //     transition: {
  //       yoyo: Infinity,
  //       ease: "anticipate",
  //       duration: 2,
  //       type: "tween",
  //       stiffness: 200,
  //     },
  //   },
  // };

  return (
    <Suspense
      fallback={
        (
          <div
            style={{
              height: '90vh',
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CirclesWithBar
              height="100"
              width="100"
              color="#f8e112"
              wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
              wrapperClass=""
              visible={true}
              outerCircleColor=""
              innerCircleColor=""
              barColor=""
              ariaLabel="circles-with-bar-loading"
            />
          </div>
        ) || (
          <h1
            style={{
              color: 'yellow',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontFamily: 'Stick No Bills',
            }}
          >
            "Loading..."
          </h1>
        )
      }
    >
      <Canvas style={{ height: '92vh' }}>
        {/* <color attach="background" args={["#000"]} /> */}
        <ambientLight intensity={1} />
        <spotLight
          position={[0, 25, 0]}
          angle={1.9}
          penumbra={1}
          castShadow
          intensity={1}
          shadow-bias={-0.0001}
        />
        <Environment preset="warehouse" />
        {/* add effects */}
        <EffectComposer>
          <Bloom
            intensity={0.2} //2
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9} //0.9
            height={1000}
          />
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={1}
            height={400}
          />
          <Vignette offset={0.1} darkness={1.5} eskil={false} />
        </EffectComposer>
        <ScrollControls
          pages={1}
          damping={0.25}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <Scroll>
            {/* top */}
            <Float
              speed={1}
              rotationIntensity={2}
              floatIntensity={0.2}
              floatingRange={[1, 12]}
            >
              <Dragon scale={1.8} position={[0, -7.5, 0]} />
            </Float>
            {/* bottom */}
            {/* <Float
            speed={1}
            rotationIntensity={2}
            floatIntensity={0.2}
            floatingRange={[1, 1]}
          >
            <Dragon scale={1.5} position={[-3, -8.5, 0]} />
          </Float> */}
            <Cloud
              opacity={0.2}
              speed={0.4} // Rotation speed
              width={7} // Width of the full cloud
              depth={0.5} // Z-dir depth
              segments={3} // Number of particles
            />
          </Scroll>

          <Scroll html>
            <motion.div
              id="home"
              variants={container}
              initial="initial"
              animate="visible"
              exit="exit"
            >
              <img src="https://www.codewars.com/users/jabjab/badges/micro" />
              <motion.div
                id="home_title"
                animate={{ fontSize: 50, color: '#f8e112' }}
                style={{ letterSpacing: 20, color: 'white' }}
                transition={{
                  delay: 1.5,
                  duration: 1.5,
                  ease: 'easeOut',
                  when: 'beforeChildren',
                }}
              >
                <h1 id="home_welcome_title">Welcome</h1>
                <motion.p
                  animate={{ fontSize: 30, color: '#FFD700', opacity: 0.3 }}
                  transition={{ delay: 2.5, duration: 1.5, ease: 'easeOut' }}
                  id="home_welcome_sub_title"
                >
                  here is everything about me
                </motion.p>
              </motion.div>
              {/* 
            <motion.div
              variants={ball}
              initial="initial"
              animate="visible"
              style={{
                backgroundColor: "#f8e112",
                width: 10,
                height: 10,
                borderRadius: 50,
              }}
            /> */}
            </motion.div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </Suspense>
  );
};
