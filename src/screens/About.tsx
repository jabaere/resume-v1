import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../api/data';
import DownloadButton from '../components/downloadButton';
export const About = () => {
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

  const aboutVariants = {
    visible: {
      opacity: 0.5,
      color: '#DFFF00',
      letterSpacing: 5,
      listStyleType: 'none',
      transition: {
        delay: 2,
      },
    },

    hidden: { opacity: 0 },
  };

  const skillsVariants = {
    visible: {
      opacity: 0.5,
      color: '#DFFF00',
      listStyleType: 'none',
      transition: {
        delay: 2,
      },
    },

    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      id="about"
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <div style={{ display: 'flex', flexDirection: 'column', margin: 30 }}>
        <DownloadButton
          file_name="udemy sertificate"
          buttonTitle="Download sertificate"
          _url="files/udemy.pdf"
        />
        <DownloadButton
          file_name="new horizon sertificate"
          buttonTitle="Download sertificate"
          _url="files/horizon.pdf"
        />
      </div>
      <div>
        <h1 id="present_title" style={{ color: 'yellow' }}>
          Hello My name is jaba
        </h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={aboutVariants}
          id="present_word"
          style={{ letterSpacing: 0.5 }}
        >
          My profession is lawyer, but always in my life, I have felt that it
          was not what I want. <br />I have always loved computers and was
          interested in programming. <br />
          And approximately 1.8 years ago I started learning programming. <br />
          Nowadays I can boldly say that I found a profession that I love and
          really enjoy doing. <br />
          My hobby is create reusable components.
        </motion.p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: 'yellow' }}>
            here are some techniques which I have touched on in
          </h3>
          <div id="skills_container">
            {skills.map((item, key) => (
              <motion.p
                initial="hidden"
                animate="visible"
                variants={skillsVariants}
                key={key}
              >
                {item}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
