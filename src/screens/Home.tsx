import React, { Suspense, useState, useRef } from 'react';
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
import GradientText from '../components/Material';
import { Forest } from '../models/Forest';
import { AutumnForest } from '../models/AutumnForest';
import ForestSound from '../sound/Forest-campfire.mp3';
import {
  Bloom,
  EffectComposer,
  Vignette,
  Grid,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import { CirclesWithBar } from 'react-loader-spinner';
import { Play, Pause, Linkedin } from 'react-feather';
import { GiBookmark } from 'react-icons/gi';
//define a separate type for the ref that includes the stop && play method
interface PositionalAudioRef
  extends React.MutableRefObject<typeof PositionalAudio | null> {
  stop: () => void;
  play: () => void;
}

export const Home = () => {
  const { width, height } = useWindowDimensions();
  const modalRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<PositionalAudioRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(true);
  //controll modal

  const hideModal = () => modalRef.current?.classList.add('modal__hide');
  const showModal = () => modalRef.current?.classList.remove('modal__hide');

  //handle sound on/off
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

  //icon styles
  const iconStyles = {
    backgroundSize: '240%',
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in',
  };

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
      <Canvas id="canvas">
        {/* <color attach="background" args={["#000"]} /> */}

        <ambientLight intensity={0.4} position={[100, -100, 0]} />
        <directionalLight
          position={[10, 0, 0]}
          intensity={0.2}
          castShadow // Enable shadow casting
          shadow-bias={-0.0001}
        />

        {/* add effects */}
        <EffectComposer>
          <Bloom
            intensity={0.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <Vignette offset={0.01} darkness={0.3} eskil={true} />
          <Grid
            blendFunction={mode ? BlendFunction.DST : BlendFunction.HUE} // blend mode //HUE//Darken|DST,
            scale={0} // grid pattern scale
            lineWidth={0} // grid pattern line width
            size={{ width, height }} // overrides the default pass width and height
          />
        </EffectComposer>
        <ScrollControls
          pages={1}
          damping={0.25}
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <Scroll>
            {/* stars */}
            {/* <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            /> */}
            {/* model */}
            {width > 630 ? <GradientText /> : null}
            <AutumnForest position={[0, 0, 2]} rotate={[0, 15.8, 0]} />
            <OrbitControls
              makeDefault
              minAzimuthAngle={-1}
              maxAzimuthAngle={4.5}
              minPolarAngle={Math.PI / 2} //2.5 default
              maxPolarAngle={Math.PI / 4}
              enableZoom={isModalOpen ? false : true}
              enablePan={true}
              rotateSpeed={0.15}
              zoomSpeed={0.4}
              minDistance={0}
              maxDistance={5}
            />
            {/* sound effects */}
            <PositionalAudio url={ForestSound} ref={audioRef} distance={20} />
          </Scroll>
          {/* html content */}
          <Scroll html>
            {/* left side bar */}
            <div className="home__left-side-bar">
              <img
                src="https://www.codewars.com/users/jabjab/badges/micro"
                style={{ height: '1.3rem' }}
              />
              <div className="icons_container">
                <GiBookmark
                  color="#3E5151"
                  size={26}
                  onClick={() => (showModal(), setIsModalOpen(true))}
                  style={iconStyles}
                  className="icon"
                />
                <p
                  onClick={() => (showModal(), setIsModalOpen(true))}
                  className="icons_text"
                >
                  Projects
                </p>
              </div>
              <div onClick={handleButtonClick} className="icons_container">
                {isPlaying ? (
                  <Pause
                    color="#3E5151"
                    size={26}
                    style={iconStyles}
                    className="icon"
                  />
                ) : (
                  <Play
                    color="#3E5151"
                    size={26}
                    style={iconStyles}
                    className="icon"
                  />
                )}
                <p className="icons_text">Sound On/Off</p>
              </div>
              <div className="icons_container">
                <a
                  href="https://www.linkedin.com/in/jaba-kobriashvili"
                  target="blank"
                  style={{ padding: 0, width: 'auto' }}
                >
                  <Linkedin
                    color="#3E5151"
                    size={26}
                    style={iconStyles}
                    className="icon"
                  />
                </a>
                <p className="icons_text">Linkedin Profile</p>
              </div>
            </div>
            {/* forest color */}
            <div className="icons_container">
              <p
                className="icons_text"
                style={{
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  fontWeight: 'lighter',
                  padding: '15px',
                  paddingTop: '35px',
                }}
                onClick={() => setMode(!mode)}
              >
                {mode ? 'Late Autumn' : 'Autumn'}
              </p>
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
                <div
                  className="modal__close-button"
                  onClick={() => (hideModal(), setIsModalOpen(false))}
                >
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
                  animate={{ fontSize: 50, color: '#000', opacity: 1 }}
                  style={{
                    letterSpacing: 2,
                    color: 'white',
                    width: '35%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '15px',
                    borderRadius: '4px',
                    alignSelf: 'flex-end',
                  }}
                  transition={{
                    delay: 1.5,
                    duration: 20,
                    ease: 'easeOut',
                    when: 'beforeChildren',
                  }}
                >
                  <motion.p
                    animate={{ fontSize: 18, color: '#000', opacity: 1 }}
                    transition={{ delay: 2.5, duration: 9.5, ease: 'easeOut' }}
                    id="home_welcome_sub_title"
                    style={{ userSelect: 'none' }}
                  >
                    Hello, I'm Jaba, a software developer who has
                    <span className="important"> fallen in love</span> with
                    programming. Over the past{' '}
                    <span className="important"> three years</span>, I've been
                    deeply immersed in studying and{' '}
                    <span className="important"> practicing programming</span>.
                    I've also gained several months of work experience and have
                    successfully completed multiple freelance projects.
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

/*

// 


*/
