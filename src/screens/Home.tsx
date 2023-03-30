import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  Scroll,
  ScrollControls,
  Html,
  Environment,
  Float,
  Cloud,
  Stage,
  Sky,
  Stars,
  OrbitControls,
  PositionalAudio,
} from '@react-three/drei';
import { AudioLoader } from 'three';
import useWindowDimensions from '../components/getWindowDimensions';

import { Dragon } from '../models/Dragon';
import { Forest } from '../models/Forest';
import ForestSound from '../sound/Forest-campfire.mp3';
import {
  Bloom,
  EffectComposer,
  Vignette,
  DepthOfField,
} from '@react-three/postprocessing';
import { CirclesWithBar } from 'react-loader-spinner';
//define a separate type for the ref that includes the stop && play method
interface PositionalAudioRef
  extends React.MutableRefObject<typeof PositionalAudio | null> {
  stop: () => void;
  play: () => void;
}

export const Home = () => {
  const { width } = useWindowDimensions();
  const modalRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<PositionalAudioRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  //controll modal

  const hideModal = () => modalRef.current?.classList.add('modal__hide');
  const showModal = () => modalRef.current?.classList.remove('modal__hide');
  setIsPlaying;
  const handleButtonClick = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef?.current.stop();
      } else {
        audioRef?.current.play();
      }
    }
  };

  useEffect(() => {
    console.log(modalRef);
  });

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
        duration: 0.5,
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
      <Canvas
        style={{ height: width < 630 ? '100vh' : '93vh' }}
        camera={{ position: [9, -5, 10], fov: 75, near: 1, far: 1000 }}
      >
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

        {/* add effects */}
        <EffectComposer>
          <Bloom
            intensity={0.2} //2
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9} //0.9
            height={1000}
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
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <Forest position={[0, 0, 1]} scale={1.5} />
            <OrbitControls
              makeDefault
              minAzimuthAngle={0}
              maxAzimuthAngle={Math.PI / 4}
              minPolarAngle={Math.PI / 5}
              maxPolarAngle={Math.PI / 3}
              enableZoom={false}
              enablePan={false}
            />
            {/* sound effects */}
            <PositionalAudio url={ForestSound} ref={audioRef} distance={20} />
          </Scroll>

          <Scroll html>
            {/* left side bar */}
            <div className="home__left-side-bar">
              <img src="https://www.codewars.com/users/jabjab/badges/micro" />
              <p
                onClick={showModal}
                style={{
                  color: 'yellow',
                }}
              >
                Quick overflow
              </p>
              <button onClick={handleButtonClick}>
                {isPlaying ? 'Stop' : 'Play'}
              </button>
            </div>
            <motion.div
              id="home"
              variants={container}
              initial="initial"
              animate="visible"
              exit="exit"
              onClick={hideModal}
            >
              {/* quick info---modal */}

              <div className="modal modal__hide" ref={modalRef}>
                <div className="modal__close-button" onClick={hideModal}>
                  X
                </div>
                <section className="top__projects"></section>
                <section className="real__projects"></section>
              </div>
              {/* left side bar */}
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
                <h1 id="home_welcome_title" style={{ userSelect: 'none' }}>
                  Welcome
                </h1>
                <motion.p
                  animate={{ fontSize: 30, color: '#FFD700', opacity: 0.3 }}
                  transition={{ delay: 2.5, duration: 1.5, ease: 'easeOut' }}
                  id="home_welcome_sub_title"
                  style={{ userSelect: 'none' }}
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
