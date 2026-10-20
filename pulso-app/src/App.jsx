import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

// Just glue — each big piece of the page lives in its own component
function App() {
  return (
    <div className="min-h-svh w-full max-w-full bg-[#f3f3f3] text-[#1a1a1a]">
      <Header />
      <main>
        <Hero />
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
