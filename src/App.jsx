import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "@components/Navbar";
//import css
import "@css/style.css";
//import page homepage
import Home from "@pages/home.jsx";
//import page toram online tools
import ToramHome from "@pages/toramtools";
import Cbc from "@pages/toramtools/cbc";
import KodeBuff from "@pages/toramtools/kodebuff";
import Equipments from "@pages/toramtools/equipments";
import MonstersTo from "@pages/toramtools/monsters";
//import page osrs tools
import OsrsHome from "@pages/osrs";
//import page not found
import NotFound from "@pages/pageNotFound.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/toramtools", element: <ToramHome /> },
  { path: "/toramtools/cbc", element: <Cbc /> },
  { path: "/toramtools/kodebuff", element: <KodeBuff /> },
  { path: "/toramtools/equipments", element: <Equipments /> },
  { path: "/toramtools/monsters", element: <MonstersTo /> },
  { path: "/osrs", element: <OsrsHome /> },
  { path: "*", element: <NotFound /> }
];

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <App />
  </React.StrictMode>
);
