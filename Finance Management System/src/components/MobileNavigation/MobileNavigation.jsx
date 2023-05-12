import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./MobileNavigation.css";

export default function MobileNavigation({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div>
        <h1>AutoMatrix</h1>
      </div>
      <div className="nav-links">
        <Link to="/transactions">Transactions</Link>
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
  );
}
