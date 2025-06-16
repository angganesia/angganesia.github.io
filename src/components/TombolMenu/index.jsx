import { Link } from "react-router-dom";

export default function TombolMenu({ to, text, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="menuHome">
      <i
        className="fa fa-gamepad"
        aria-hidden="true"></i>
      {text}
    </Link>
  );
}
