import { saveAs } from 'file-saver';
import React, { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
type ButtonProps = {
  buttonTitle: string;
  _url: string;
  file_name: string;
};
const btn = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.9,
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

const DownloadButton: FunctionComponent<ButtonProps> = ({
  buttonTitle,
  _url,
  file_name,
}) => {
  const downloadFile = async () => {
    let url = _url; //"cv/jabakobriashvili.pdf";
    let fileName = file_name; //"cv";
    const res = await fetch(url);
    const blob = await res.blob();
    saveAs(blob, fileName);
  };
  return (
    <motion.a
      onClick={() => {
        let password = prompt('Please enter password');
        if (password === 'enterpassword') {
          downloadFile();
        } else {
          alert('password not match');
        }
      }}
      style={{ cursor: 'pointer', margin: 5, padding: 8, width: 'auto' }}
      whileHover={{ color: '#DFFF00' }}
      transition={{ duration: 1 }}
      variants={btn}
      initial="initial"
      animate="visible"
      exit="exit"
      id="button"
    >
      {buttonTitle}
    </motion.a>
  );
};
export default DownloadButton;
