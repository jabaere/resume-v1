import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MobileMenuButton } from '../components/MobileMenuButton';
import useWindowDimensions from '../components/getWindowDimensions';
export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  console.log(location.pathname);
  const menuButtonStyle = {
    marginLeft: '1rem',
    paddingTop: '1rem',
  };

  const mobileMenuVariant = {
    show: {
      display: width < 630 ? 'block' : 'none',

      zIndex: 1000,
    },
  };

  const navigationVariant = {
    hover: {
      scale: 1.1,
      originX: 0,
      color: '#f8e112',
      transition: {
        type: 'spring',
        stiffness: 400,
      },
    },
    hidden: { opacity: 0, x: -1000 },
    show: {
      opacity: 1,
      x: 100,
    },
  };
  const container = {
    hidden: { opacity: 0, z: 1000, display: 'none' },
    show: {
      opacity: 1,
      x: 0,
      display:
        (width > 630 && location.pathname !== '/') || isOpen ? 'flex' : 'none',

      transition: {
        type: 'spring',
        stiffness: 350,
        duration: 3,
        delayChildren: 250,
        damping: 9,
      },
    },
  };

  const routes = ['/', 'cv', 'about', 'projects', 'stack'];

  return (
    <>
      <motion.div
        variants={mobileMenuVariant}
        animate="show"
        style={
          width > 630 ? { position: 'relative' } : { position: 'absolute' }
        }
      >
        {/* <MobileMenuButton
          width={24}
          height={24}
          color={'yellow'}
          isOpen={isOpen}
          onClick={() => setOpen(!isOpen)}
          style={menuButtonStyle}
        /> */}
      </motion.div>
      <motion.div
        id="header_container"
        variants={container}
        initial="hidden"
        animate="show"
        style={
          width > 630 ? { flexDirection: 'row' } : { flexDirection: 'column' }
        }
      >
        {routes.map((a, i) => {
          return (
            <motion.a
              onClick={() => {
                setOpen(false);
                return navigate(`${a}`);
              }}
              variants={navigationVariant}
              whileHover="hover"
              key={i}
              className="colored__a"
              style={{ userSelect: 'none' }}
            >
              {a === '/' ? 'home' : a}
            </motion.a>
          );
        })}
      </motion.div>
    </>
  );
};
