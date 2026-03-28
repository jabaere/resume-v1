import React, { Suspense, useState, useRef, useMemo, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  Scroll,
  ScrollControls,
  Stars,
  OrbitControls,
  PositionalAudio,
  Text,
} from '@react-three/drei';

import useWindowDimensions from '../components/getWindowDimensions';
import ModalTabs from '../components/ModalTabs';
//import GradientText from '../components/Material';
import { Forest } from '../models/Forest';
import ForestSound from '../sound/Forest-campfire.mp3';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { CirclesWithBar } from 'react-loader-spinner';
import { Play, Pause, Linkedin } from 'react-feather';
import { GiBookmark } from 'react-icons/gi';
import { IoMdAnalytics } from "react-icons/io";
import { ErrorBoundary } from '../components/ErrorBoundary';
//define a separate type for the ref that includes the stop && play method
interface PositionalAudioRef
  extends React.MutableRefObject<typeof PositionalAudio | null> {
  stop: () => void;
  play: () => void;
}

export const Home = () => {
  const { width, height } = useWindowDimensions();
  const modalRef = useRef<HTMLInputElement>(null);
  // const audioRef = useRef<PositionalAudioRef>(null);
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  //controll modal

  const hideModal = () => modalRef.current?.classList.add('modal__hide');
  const showModal = () => modalRef.current?.classList.remove('modal__hide');

  //handle sound on/off
  const handleButtonClick = useCallback(() => {
    setIsPlaying(prev => {
      if (audioRef.current) {
        prev ? audioRef.current.stop() : audioRef.current.play();
      }
      return !prev;
    });
  }, []);
  

  //icon styles
  const iconStyles = useMemo(() => ({
    backgroundSize: '240%',
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in',
  }), []);

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

  const fallbackContent =  (
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
  );
  


  return (
    <Suspense fallback={fallbackContent}>
      <Canvas
        id="canvas"
        camera={{ position: [7.5, -5, 11], fov: 75, near: 1, far: 1000 }} //9,-5,10
        dpr={window.devicePixelRatio < 2 ? 1 : 2}
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

          <Vignette offset={0.001} darkness={1.12} eskil={false} />
        </EffectComposer>
        <ScrollControls
          pages={1}
          damping={0.25}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <Scroll>
            {/* stars */}
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            {/* model */}
            {/*width > 630 ? <GradientText /> : null*/}
            <Forest position={[0, 0, 1]} scale={1.5} />
            <OrbitControls
              makeDefault
              minAzimuthAngle={-1}
              maxAzimuthAngle={1.5}
              minPolarAngle={Math.PI / 2.4} //2.5 default
              maxPolarAngle={Math.PI / 4}
              enableZoom={false}
              enablePan={false}
            />
            {/* sound effects */}
            <ErrorBoundary>
              <PositionalAudio url={ForestSound} ref={audioRef} distance={20} />
            </ErrorBoundary>
          </Scroll>
          {/* html content */}
          <Scroll html>
            {/* left side bar */}
            <div className="home__left-side-bar">
              {/* <img
                src="https://www.codewars.com/users/jabjab/badges/micro"
                style={{ height: '1.3rem' }}
              /> */}
              <div className="icons_container">
                <GiBookmark
                  color="#CCCCCC"
                  size={26}
                  onClick={showModal}
                  style={iconStyles}
                  className="icon"
                />
                <p onClick={showModal} className="icons_text">
                  Projects
                </p>
              </div>
                <div className="icons_container">
                <a
                  href="https://power-bi.bytebriefs.click/"
                  style={{ padding: 0, width: 'auto' }}
                  className="icons_container"
                >
                  <IoMdAnalytics
                    color="#CCCCCC"
                    size={26}
                    style={iconStyles}
                    className="icon"
                  />
                
                <p className="icons_text">Power BI</p>
                </a>
              </div>
              <div onClick={handleButtonClick} className="icons_container">
                {isPlaying ? (
                  <Pause
                    color="#CCCCCC"
                    size={26}
                    style={iconStyles}
                    className="icon"
                  />
                ) : (
                  <Play
                    color="#CCCCCC"
                    size={26}
                    style={iconStyles}
                    className="icon"
                  />
                )}
                <p className="icons_text" role="button" tabIndex={0}>Sound On/Off</p>
              </div>
              <div className="icons_container">
                <a
                  href="https://www.linkedin.com/in/jaba-kobriashvili"
                  target="blank"
                  style={{ padding: 0, width: 'auto' }}
                  className="icons_container"
                >
                  <Linkedin
                    color="#CCCCCC"
                    size={26}
                    style={iconStyles}
                    className="icon"
                  />
                
                <p className="icons_text">Linkedin </p>
                </a>
              </div>
                          
          

            </div>
            <motion.div
              id="home"
              variants={container}
              initial="initial"
              animate="visible"
              exit="exit"
              // onClick={hideModal}
            >
              {/* quick info---modal */}

              <div className="modal modal__hide" ref={modalRef}>
                <div className="modal__close-button" onClick={hideModal}>
                  X
                </div>
                <ModalTabs />
                <section className="top__projects"></section>
                <section className="real__projects"></section>
              </div>
              {/* left side bar */}
              {width > 521 && (
                <motion.div
                  id="home_title"
                  animate={{
                    y: [0, -15, 0],
                    boxShadow: [
                      '0 0 20px rgba(255, 0, 255, 0)',
                      '0 0 40px rgba(0, 255, 255, 0.5)',
                      '0 0 20px rgba(255, 0, 255, 0)',
                    ],
                  }}
                  style={{
                    letterSpacing: 2,
                    color: 'white',
                    width: '35%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    backdropFilter: 'blur(6px)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                    padding: '15px',
                    borderRadius: '12px',
                    alignSelf: 'flex-end',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  transition={{
                    delay: 1.5,
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                >
                  <motion.p
                    animate={{
                      opacity: [0.8, 1, 0.8],
                      textShadow: [
                        '0 0 10px rgba(0, 255, 255, 0)',
                        '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(255, 0, 255, 0.3)',
                        '0 0 10px rgba(0, 255, 255, 0)',
                      ],
                    }}
                    transition={{
                      delay: 2,
                      duration: 3.5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                    id="home_welcome_sub_title"
                    style={{
                      userSelect: 'none',
                      lineHeight: 1.5,
                      fontSize: 18,
                      fontWeight: 500,
                      background: 'linear-gradient(to right, #00ffff, #ff00ff, #00ffff)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <motion.span
                      animate={{
                        backgroundPosition: ['0% center', '100% center', '0% center'],
                      }}
                      transition={{
                        delay: 2,
                        duration: 3.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                      }}
                      style={{
                        display: 'inline-block',
                      }}
                    >
                      If you have an interesting project, I am available to join as a freelancer or contractor.
                      Please contact me via LinkedIn profile.
                    </motion.span>
                  </motion.p>
                </motion.div>
              )}
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
