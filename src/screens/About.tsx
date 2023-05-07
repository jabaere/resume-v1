import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../api/data';
import DownloadButton from '../components/downloadButton';
import DOMPurify from 'dompurify';
import {
  about__text_four,
  about__text_one,
  about__text_three,
  about__text_two,
} from '../config/config';
import { GiShakingHands } from 'react-icons/gi';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { GiSpellBook } from 'react-icons/gi';
import { GiAtomCore } from 'react-icons/gi';

export const About = () => {
  const sanitizedPOne = () => ({
    __html: DOMPurify.sanitize(about__text_one),
  });
  const sanitizedPTwo = () => ({
    __html: DOMPurify.sanitize(about__text_two),
  });
  const sanitizedPThree = () => ({
    __html: DOMPurify.sanitize(about__text_three),
  });
  const sanitizedPFour = () => ({
    __html: DOMPurify.sanitize(about__text_four),
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

  return (
    <motion.div
      id="about"
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <div style={{ display: 'flex', margin: '10px auto', order: 2 }}>
        <DownloadButton
          file_name="udemy sertificate"
          buttonTitle="Udemy-React native sertificate"
          _url="files/udemy.pdf"
        />
        <DownloadButton
          file_name="New Horizon sertificate"
          buttonTitle="Mobile App Development: React Native"
          _url="files/horizon.pdf"
        />
      </div>
      <div>
        <h1
          id="present_title"
          style={{ color: 'yellow', textAlign: 'center' }}
          className="colored__titles"
        >
          Hello My name is jaba
        </h1>
        <div className="about__paragraph-container">
          <GiAtomCore style={{ color: '#CCCCCC', fontSize: '50px' }} />
          <p
            dangerouslySetInnerHTML={sanitizedPOne()}
            className="colored__paragraphs"
          ></p>
        </div>
        <div className="about__paragraph-container">
          <GiSpellBook style={{ color: '#CCCCCC', fontSize: '50px' }} />
          <p
            dangerouslySetInnerHTML={sanitizedPTwo()}
            className="colored__paragraphs"
          ></p>
        </div>
        <div className="about__paragraph-container">
          <GiMagnifyingGlass style={{ color: '#CCCCCC', fontSize: '50px' }} />
          <p
            dangerouslySetInnerHTML={sanitizedPThree()}
            className="colored__paragraphs"
          ></p>
        </div>
        <div className="about__paragraph-container">
          <GiShakingHands style={{ color: '#CCCCCC', fontSize: '50px' }} />
          <p
            dangerouslySetInnerHTML={sanitizedPFour()}
            className="colored__paragraphs"
          ></p>
        </div>
      </div>
    </motion.div>
  );
};
