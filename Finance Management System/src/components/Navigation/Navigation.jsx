import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import * as userService from "../../utilities/users-service";
import "./Navigation.css";

export default function Navigation({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`${menuOpen ? "open" : ""}`}>
        <div>
          <h1 className="automatrix">Auto Matrix</h1>
        </div>
        <div className="nav-links">
          <Link to="/transactions">Dashboard</Link>
          <Link to="/capital">Capital</Link>
          <Link to="/income">Income</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/liabilities">Liability</Link>
          <Link to="/investment">Investment</Link>
          <Link to="" onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i> Log Out
          </Link>
        </div>
      </nav>
      <div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>
      </div>
    </>
  );
}
