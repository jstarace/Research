import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Routes, Route } from "react-router-dom";

import NavigationBar from "./components/header/NavigationBar";
import Home from "./pages/1.home/Home";
import Projects from "./pages/2.projects/Projects";
import Publications from "./pages/3.Publications/Publications";
import About from "./pages/4.about/About";
import SpecialThanks from "./pages/5.SpecialThanks/SpecialThanks";

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Publications" element={<Publications />} />
        <Route path="/About" element={<About />} />
        <Route path="/SpecialThanks" element={<SpecialThanks />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
