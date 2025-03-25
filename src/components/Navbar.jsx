import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";

const NAV_ITEMS = [
  { path: "/#program", label: "Our Program" },
  { path: "/acceptable-items", label: "Acceptable Items" },
  { path: "/Listed-items", label: "Listed Items" },
  { path: "/#charities", label: "Our Charities" },
  { path: "/form", label: "Donate Items", highlight: true },
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky-header ${isSticky ? "sticky" : ""}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img
            src="/logo192.png"
            alt="SoftRiseup"
            className={`nav-logo ${isSticky ? "nav-logo-small" : ""}`}
          />
        </Link>

        <div className="nav-container">
          <button
            className={`menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`main-nav ${isMobileMenuOpen ? "open" : ""}`}>
            <ul className="nav-menu">
              {NAV_ITEMS.map(({ path, label, highlight }) => (
                <li key={path} className="nav-item">
                  <Link
                    to={path}
                    className={`nav-link ${highlight ? "highlight" : ""} ${
                      pathname + hash === path ? "active" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
