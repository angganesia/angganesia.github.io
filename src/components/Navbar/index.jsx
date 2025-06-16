import { useState, useEffect } from "react";
import TombolMenu from "@components/TombolMenu";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const menuNavbar = [
    {
      title: "Toram Online Tools",
      link: "toramtools",
    },
    {
      title: "Old School RuneScape Tools",
      link: "osrs",
    },
  ];

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".navbar-nav") &&
        !event.target.closest(".navbar-toggle")
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href={import.meta.env.BASE_URL}>angganesia</a>
      </div>
      {/* <button onClick={toggleDarkMode}>tonggle</button> */}
      <div className="navbar-toggle" onClick={handleToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-nav ${isActive ? "show" : ""}`}>
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <div className="space"></div>
        {menuNavbar.map((i, index) => (
          <li key={index}>
            <TombolMenu to={i.link} text={i.title} onClick={handleClose} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
