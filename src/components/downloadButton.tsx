import { saveAs } from "file-saver";
import React, { FunctionComponent } from "react";
import { motion } from "framer-motion";
type ButtonProps = {
  buttonTitle: string;
  _url: string;
  file_name: string;
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
    <motion.button
      onClick={()=> {
        let password = prompt('Please enter password');
        if(password==='enterpassword'){
          downloadFile()
        }
         else{
          alert('password not match')
         }
        }}
      style={{ cursor: "pointer", margin: 5, padding: 8 }}
      whileHover={{ backgroundColor: "#d73b3e"}}
      transition={{ duration: 1 }}
      id='button'
    >
      {buttonTitle}
    </motion.button>
  );
};
export default DownloadButton;
