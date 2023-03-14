import React, { useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { BsFillHeartFill } from "react-icons/bs";
import {
  skills,
  experience,
  projects,
  education,
  awards,
  interests,
} from "../api/data";
import DownloadButton from "../components/downloadButton";
import { CvItem } from "../components/CvItem";
import ThemeContext from "../context/ThemeContext";

export const Cv = () => {
  const { resize } = useContext(ThemeContext);
  const hideNumRef = useRef<HTMLDivElement>(null);
  const hideAddr = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (resize && hideNumRef.current !== null && hideAddr.current !== null) {
      hideNumRef.current.innerHTML = "blablabla";
      hideAddr.current.innerHTML = "blablabla";
      localStorage.setItem("resize", JSON.stringify(true));
    }
  }, [resize]);
  const container = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      scale: 0.9,
      display: "flex",
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
  return (
    <motion.div
      id="cv"
      variants={container}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <DownloadButton
        file_name="cv"
        buttonTitle="Download"
        _url="files/cv.pdf"
      />
      <div id="cv_container">
        <h1 id="cv_title">
          Jaba<span style={{ fontWeight: "bold" }}>Kobriashvili</span>
        </h1>

        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", flexDirection: "column", flex: 3 }}
            id="left-container"
          >
            <div
              id="contact"
              style={{
                display: "flex",
                textAlign: "right",
                flexDirection: "column",
              }}
            >
              <h4 style={{ color: "#4D4D4D", marginBottom: 0 }}>contact</h4>
              <p
                style={{ marginTop: 0, fontSize: 12 }}
                className="hide"
                ref={hideAddr}
              >
                45a kavkasioni st <br />
                Telavi, Kakheti <br />
                Georgia
              </p>
              <p style={{ fontSize: 12 }} className="hide" ref={hideNumRef}>
                {" "}
                +995 (551) 10 40 11
              </p>
              <p style={{ fontSize: 12 }}>kobriashvili@gmail.com</p>
            </div>

            <div
              id="language"
              style={{
                display: "flex",
                textAlign: "right",
                flexDirection: "column",
              }}
            >
              <h4 style={{ color: "#4D4D4D", marginBottom: 0 }}>languages</h4>
              <p style={{ marginTop: 0, fontSize: 12 }}>
                Georgian mother <br />
                tongue <br />
                English b1-b2 (...still <br />
                learning)
              </p>
            </div>
            <div
              id="programing"
              style={{
                display: "flex",
                textAlign: "right",
                flexDirection: "column",
              }}
            >
              <h4 style={{ color: "#4D4D4D", marginBottom: 0 }}>programming</h4>
              <p style={{ marginTop: 0, fontSize: 12 }}>
                <BsFillHeartFill color="red" />
                Javascript <br />
                Python <br />
                GraphQL <br />
              </p>
            </div>
          </div>
          <div
            id="right-container"
            style={{
              display: "flex",
              flex: 9,
              marginLeft: 60,
              flexDirection: "column",
            }}
          >
            <div id="skills">
              <h3 style={{ color: "#4D4D4D", marginBottom: 0 }}>
                <span style={{ color: "cyan" }}>ski</span>lls
              </h3>
              <p
                style={{ fontSize: 13, marginRight: "10px", color: "#4D4D4D" }}
              >
                {skills.map((skill) => skill + ", ")}
              </p>
            </div>
            <CvItem
              data={experience}
              id="experience"
              color="red"
              title="exp"
              title2="erience"
            />
            <CvItem
              data={projects}
              id="projects"
              color="orange"
              title="my-"
              title2="projects"
            />
            <CvItem
              data={education}
              id="education"
              color="chartreuse"
              title="edu"
              title2="cation"
            />
            <CvItem
              data={awards}
              id="awards"
              color="darkviolet"
              title="awa"
              title2="rds"
            />
            <CvItem
              data={interests}
              id="interests"
              color="darkcyan"
              title="int"
              title2="erests"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
