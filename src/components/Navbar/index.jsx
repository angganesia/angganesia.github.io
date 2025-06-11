import { useState, useEffect } from "react";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".navbar-nav") && !event.target.closest(".navbar-toggle")) {
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
      <div
        className="navbar-toggle"
        onClick={handleToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-nav ${isActive ? "show" : ""}`}>
        <button
          className="close-button"
          onClick={handleClose}>
          X
        </button>
        <div className="space"></div>
        <li>
          <a href={"#/toramtools"}>
            <i
              class="fa fa-gamepad"
              aria-hidden="true"></i>
            Toram Online Tools
          </a>
        </li>
        <li>
          <i
            class="fa fa-gamepad"
            aria-hidden="true"></i>
          <a href={"#/osrs"}>Old School RuneScape Tools</a>
        </li>
      </ul>
    </nav>
  );
}
