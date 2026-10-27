import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ClassDetail from "./components/ClassDetail";
import Success from "./components/Success";

// Landing page pieces — kept separate so /login doesn't render the whole site
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
    // Router wraps everything so Header links + Login can use <Link> / navigate()
    <BrowserRouter>
      <div className="min-h-svh w-full max-w-full bg-[#f3f3f3] text-[#1a1a1a]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* :id comes from the URL, e.g. /classes/33 → ClassDetail fetches that row */}
            <Route path="/classes/:id" element={<ClassDetail />} />
            <Route path="/login" element={<Login mode="login" />} />
            <Route path="/signup" element={<Login mode="signup" />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
