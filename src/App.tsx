import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import { Home } from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Pages from "./pages/Pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "./api/axiosInstance";
import { userInfo } from "./api/getUserInfo";
import { setUserData } from "./redux/slicer/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getSetUserData = async () => {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Token ${token}`;
        const userData = await userInfo();
        if (userData[0]) {
          dispatch(setUserData(userData[1].data));
        } else {
          delete axiosInstance.defaults.headers.common["Authorization"];
          localStorage.removeItem("token");
        }
      };
      getSetUserData();
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
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
