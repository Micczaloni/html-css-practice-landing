import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Login from "./components/Login";

function HomePage() {
  return (
    <>
      <Hero />
      <MainContent />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-svh w-full max-w-full bg-[#f3f3f3] text-[#1a1a1a]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login mode="login" />} />
            <Route path="/signup" element={<Login mode="signup" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
