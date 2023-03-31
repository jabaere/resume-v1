import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { Home } from './screens/Home';
import { About } from './screens/About';
import { Stack } from './screens/Stack';
import { Cv } from './screens/Cv';
import { Projects } from './screens/Projects';
import { Header } from './components/Header';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ThemeContext from './context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import * as analytics from './ga4';

function App() {
  const location = useLocation();
  const { color1, color2 } = useContext(ThemeContext);

  React.useEffect(() => {
    analytics.init();
  }, []);

  React.useEffect(() => {
    const path = location.pathname + location.search;
    analytics.sendPageview(path);
  }, [location]);

  return (
    <ThemeProvider>
      <div
        className="App"
        id="app"
        style={{
          backgroundImage: `linear-gradient(190deg,  ${color1} 35%, ${color2} 150%)`,
        }}
      >
        <Header />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route key="/" path="/" element={<Home />} />
            <Route key="cv" path="/cv" element={<Cv />} />
            <Route key="about" path="/about" element={<About />} />
            <Route key="projects" path="/projects" element={<Projects />} />
            <Route key="stack" path="/stack" element={<Stack />} />
          </Routes>
        </AnimatePresence>
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;

// Model Information:
// * title:	Animated Dragon Three Motion Loops
// * source:	https://sketchfab.com/3d-models/animated-dragon-three-motion-loops-eca98cf6cd084c1596cecf716e110c29
// * author:	LasquetiSpice (https://sketchfab.com/LasquetiSpice)

// Model License:
// * license type:	CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
// * requirements:	Author must be credited. Commercial use is allowed.
