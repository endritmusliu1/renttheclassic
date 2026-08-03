import React from 'react';
import './Navbar.css';
import logoImg from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  user: any;
  setUser: (user: any) => void;
}

const Navbar = ({ user, setUser }: NavbarProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logoImg} alt="Rental Logo" />
      </Link>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {user && (
          <Link to="/my-bookings">My Bookings</Link>
        )}
        {user && user.roles[0]?.name === "admin" && (
          <>
            <Link to="/admin/dashboard" className="admin-link">
              Cars
            </Link>
            <Link to="/admin/bookings" className="admin-link">
              Bookings
            </Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="welcome-user">
              Welcome, {user.name}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;