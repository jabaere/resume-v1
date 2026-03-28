import React, { Suspense, useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  Scroll,
  ScrollControls,
  Stars,
  OrbitControls,
  PositionalAudio,
} from '@react-three/drei';

import useWindowDimensions from '../components/getWindowDimensions';
import ModalTabs from '../components/ModalTabs';
import { Forest } from '../models/Forest';
import ForestSound from '../sound/Forest-campfire.mp3';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { CirclesWithBar } from 'react-loader-spinner';
import { Play, Pause, Linkedin } from 'react-feather';
import { GiBookmark } from 'react-icons/gi';
import { IoMdAnalytics } from 'react-icons/io';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SideBarButton } from '../components/SideBarButton';

// Shared icon color — purely presentational
const ICON_COLOR = '#CCCCCC';
const ICON_SIZE = 26;

export const Home = () => {
  const { width } = useWindowDimensions();
  const modalRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hideModal = () => modalRef.current?.classList.add('modal__hide');
  const showModal = () => modalRef.current?.classList.remove('modal__hide');

  const handleSoundToggle = useCallback(() => {
    setIsPlaying(prev => {
      if (audioRef.current) {
        prev ? audioRef.current.stop() : audioRef.current.play();
      }
      return !prev;
    });
  }, []);

  const containerVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.9, duration: 1.5, ease: 'easeOut' } },
    exit: { y: '-100vw', transition: { ease: 'easeInOut', delay: 1.5, duration: 0.5 } },
  };

  const fallback = (
    <div style={{ height: '90vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CirclesWithBar
        height="100" width="100" color="#f8e112"
        wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
        wrapperClass="" visible={true}
        outerCircleColor="" innerCircleColor="" barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <Canvas
        id="canvas"
        camera={{ position: [7.5, -5, 11], fov: 75, near: 1, far: 1000 }}
        dpr={window.devicePixelRatio < 2 ? 1 : 2}
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[0, 25, 0]} angle={1.9} penumbra={1}
          castShadow intensity={1} shadow-bias={-0.0001}
        />

        <EffectComposer>
          <Bloom intensity={0.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={1000} />
          <Vignette offset={0.001} darkness={1.12} eskil={false} />
        </EffectComposer>

        <ScrollControls pages={1} damping={0.25} style={{ width: '100%', overflow: 'hidden' }}>
          <Scroll>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Forest position={[0, 0, 1]} scale={1.5} />
            <OrbitControls
              makeDefault
              minAzimuthAngle={-1} maxAzimuthAngle={1.5}
              minPolarAngle={Math.PI / 2.4} maxPolarAngle={Math.PI / 4}
              enableZoom={false} enablePan={false}
            />
            <ErrorBoundary>
              <PositionalAudio url={ForestSound} ref={audioRef} distance={20} />
            </ErrorBoundary>
          </Scroll>

          <Scroll html>
            {/* ── Left sidebar — each SideBarButton has its own isolated useState ── */}
            <div className="home__left-side-bar">

              <SideBarButton
                label="Projects"
                icon={<GiBookmark color={ICON_COLOR} size={ICON_SIZE} />}
                onClick={showModal}
              />

              <SideBarButton
                label="Power BI"
                icon={<IoMdAnalytics color={ICON_COLOR} size={ICON_SIZE} />}
                onClick={() => window.open('https://power-bi.bytebriefs.click/', '_blank')}
              />

              <SideBarButton
                label="Sound On/Off"
                icon={
                  isPlaying
                    ? <Pause color={ICON_COLOR} size={ICON_SIZE} />
                    : <Play color={ICON_COLOR} size={ICON_SIZE} />
                }
                onClick={handleSoundToggle}
              />

              <SideBarButton
                label="LinkedIn"
                icon={<Linkedin color={ICON_COLOR} size={ICON_SIZE} />}
                onClick={() => window.open('https://www.linkedin.com/in/jaba-kobriashvili', '_blank')}
              />

            </div>

            {/* ── Main home area ── */}
            <motion.div
              id="home"
              variants={containerVariants}
              initial="initial"
              animate="visible"
              exit="exit"
            >
              {/* Modal */}
              <div className="modal modal__hide" ref={modalRef}>
                <div className="modal__close-button" onClick={hideModal}>X</div>
                <ModalTabs />
                <section className="top__projects" />
                <section className="real__projects" />
              </div>

              {/* Floating info card */}
              {width > 521 && (
                <motion.div
                  id="home_title"
                  animate={{
                    y: [0, -15, 0],
                    boxShadow: [
                      '0 0 20px rgba(249, 115, 22, 0)',
                      '0 0 20px rgba(249, 115, 22, 0.5)',
                      '0 0 20px rgba(249, 115, 22, 0)',
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
                      backgroundImage: 'linear-gradient(to right, #c2410c 0%, #f59e0b 50%, #facc15 100%)',
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
            </motion.div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </Suspense>
  );
};