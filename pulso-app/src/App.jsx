import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <div className="bg-[#f3f3f3]">
        <Hero />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default App;
