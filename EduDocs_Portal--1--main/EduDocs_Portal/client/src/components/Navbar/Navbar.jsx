import logo from "../../assets/images/logo.svg";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { isStudentLoggedIn, logoutStudent } from "../../api/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isStudentLoggedIn();

  const handleLogout = () => {
    logoutStudent();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
        <h3>EduDocs Portal</h3>
      </div>

      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/request-document"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Request
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/track-request"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Track
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/request-history"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            History
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Profile
          </NavLink>
        </li>
      </ul>

      <div className={styles.authButtons}>
        {loggedIn ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login">
              <button type="button">Login</button>
            </NavLink>

            <NavLink to="/register">
              <button type="button">Register</button>
            </NavLink>
          </>
        )}

        <NavLink to="/admin/login">
          <button type="button" className={styles.adminButton}>Admin</button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
