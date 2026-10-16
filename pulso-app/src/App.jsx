import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <div className="bg-[#f3f3f3]">
        <Hero />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
