import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../api/data';
import DownloadButton from '../components/downloadButton';
import DOMPurify from 'dompurify';
import { about__text } from '../config/config';
export const About = () => {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(about__text),
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

  const aboutVariants = {
    visible: {
      opacity: 0.65,
      color: '#DFFF00',
      letterSpacing: 5,
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
        <h1
          id="present_title"
          style={{ color: 'yellow' }}
          className="colored__titles"
        >
          Hello My name is jaba
        </h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={aboutVariants}
          id="present_word"
          style={{ letterSpacing: 0.5 }}
          dangerouslySetInnerHTML={sanitizedData()}
          className="colored__paragraphs"
        ></motion.p>
      </div>
    </motion.div>
  );
};
