import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import { Home } from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Pages from "./pages/Pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header title="PickBazar" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
