import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav>
        <NavLink
          className="border-2 border-black rounded-lg p-2 mr-2 cursor-point"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="border-2 border-black rounded-lg p-2 cursor-point"
          to="/create"
        >
          Create Item
        </NavLink>
      </nav>
    </div>
  );
}
