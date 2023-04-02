import React from 'react';
import { motion } from 'framer-motion';
import { links } from '../api/data';
export const Projects = () => {
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
  const aTag = {
    initial: {
      color: 'whitesmoke',
    },
    hover: {
      color: '#0f0f0f',
    },
    hidden: {
      color: 'whitesmoke',
    },
  };

  const liTag = {
    visible: (i: number) => ({
      opacity: 1,
      listStyleType: 'none',
      lineHeight: 2,

      transition: {
        delay: i * 0.3,
      },
    }),
    hidden: {
      opacity: 0,
      listStyleType: 'none',
      lineHeight: 0.5,
      background: 'inherit',
    },
    hover: {
      scale: 1.2,
      originX: 0,
      background: '#f8e112',

      transition: {
        type: 'spring',
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      id="projects"
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      {links.map((item, i) => (
        <motion.li
          custom={i}
          variants={liTag}
          animate="visible"
          initial="hidden"
          whileHover="hover"
          key={i}
        >
          <motion.a
            variants={aTag}
            id="project_list_a"
            href={item}
            target="_blank"
            rel="noreferrer"
            initial="initial"
            whileHover="hover"
            animate="hidden"
            className="colored__a"
          >
            {item}
          </motion.a>
        </motion.li>
      ))}
    </motion.div>
  );
};
