import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";

export const Dashboard = () => {
  const {
    handleColorOne,
    handleColorTwo,
    color1,
    color2,
    reloadAndSave,
    reset,
  } = useContext(ThemeContext);

  const container = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.9,
        duration: 1.5,
        ease: "easeOut",
      },
    },
    exit: {
      y: "-100vw",
      transition: {
        ease: "easeInOut",
        delay: 1.5,
        duration: 1.5,
      },
    },
  };

  const styles = {
    container: {
      backgroundImage: `linear-gradient(300deg, ${color1} 35%, ${color2} 150%)`,
    },
  };

  useEffect(() => {
    let x: any = document.getElementById("app") as HTMLInputElement;
    x.style.backgroundImage = styles.container.backgroundImage;
    console.log("color changed");
  }, [color1, color2]);
  return (
    <motion.div
      id="dashboard"
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <form>
        <div>
          <label>
            Color 1
            <input
              type="text"
              name="name"
              onChange={(e) => handleColorOne?.(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Color 2
            <input
              type="text"
              name="name"
              onChange={(e) => handleColorTwo?.(e.currentTarget.value)}
            />
          </label>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              reloadAndSave?.();
            }}
            whileHover={{ backgroundColor: "#d73b3e" }}
            transition={{ duration: 2 }}
            style={{ padding: 5 }}
          >
            Save
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              reset?.();
            }}
            whileHover={{ backgroundColor: "#d73b3e" }}
            transition={{ duration: 2 }}
            style={{ padding: 5 }}
          >
            reset
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
