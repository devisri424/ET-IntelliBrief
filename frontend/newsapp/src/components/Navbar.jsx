import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">ET IntelliBrief</h1>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/persona">Persona</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
