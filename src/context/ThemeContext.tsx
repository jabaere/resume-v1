import { createContext, useState, useEffect } from "react";

interface IThemeContext {
  hexColorOne: string;
  hexColorTwo: string;
  color1: string;
  color2: string;
  handleColorOne?: (e: string) => void;
  handleColorTwo?: (e: string) => void;
  reloadAndSave?: () => void;
  reset?: () => void;
  resize: any;
  windowWidth: number;
}

const defaultState = {
  hexColorOne: "",
  hexColorTwo: "",
  color1: localStorage.getItem("hexColorOne") || "#000000",
  color2: localStorage.getItem("hexColorTwo") || "#a9a9a9",
  resize: localStorage.getItem("resize") || false,
  windowWidth: window.innerWidth,
};

const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeProvider = (props: any) => {
  const [hexColorOne, setHexColorOne] = useState(defaultState.hexColorOne);
  const [hexColorTwo, setHexColorTwo] = useState(defaultState.hexColorTwo);
  const [color1, setColor1] = useState(defaultState.color1);
  const [color2, setColor2] = useState(defaultState.color2);
  const [resize, setResize] = useState(defaultState.resize);
  const [windowWidth, setWindowWidth] = useState(defaultState.windowWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setResize(true));
    console.log(window.innerWidth);
    if (windowWidth > window.innerWidth) {
      setResize(true);
      localStorage.setItem("resize", JSON.stringify(true));
    }
    const resiz = localStorage.getItem("resize") || resize;
    setResize(resiz);
  }, []);

  const handleColorOne = (color: string) => {
    setHexColorOne(color);
  };

  const handleColorTwo = (color: string) => {
    setHexColorTwo(color);
  };

  const reloadAndSave = () => {
    setColor1(hexColorOne);
    setColor2(hexColorTwo);
    localStorage.setItem("hexColorTwo", hexColorTwo);
    localStorage.setItem("hexColorOne", hexColorOne);
  };

  const reset = () => {
    localStorage.setItem("hexColorTwo", "#a9a9a9");
    localStorage.setItem("hexColorOne", "#000000");
    setColor1("#000000");
    setColor2("#a9a9a9");
  };

  return (
    <ThemeContext.Provider
      value={{
        hexColorOne,
        hexColorTwo,
        handleColorOne,
        handleColorTwo,
        reloadAndSave,
        reset,
        color1,
        color2,
        resize,
        windowWidth,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
