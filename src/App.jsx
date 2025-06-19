import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import "@css/style.css";
import Home from "@pages/home.jsx";
import ToramHome from "@pages/toramtools";
import Cbc from "@pages/toramtools/cbc";
import KodeBuff from "@pages/toramtools/kodebuff";
import SearchData from "@pages/toramtools/searchdata";
import MqCal from "@pages/toramtools/mq_cal";
import OsrsHome from "@pages/osrs";
import NotFound from "@pages/pageNotFound.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/toramtools", element: <ToramHome /> },
  { path: "/toramtools/cbc", element: <Cbc /> },
  { path: "/toramtools/kodebuff", element: <KodeBuff /> },
  { path: "/toramtools/searchdata", element: <SearchData /> },
  { path: "/toramtools/mqcal", element: <MqCal /> },
  { path: "/osrs", element: <OsrsHome /> },
  { path: "*", element: <NotFound /> }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <HashRouter>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
      <Footer />
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
