import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faSearch, faCartPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log(searchValue);
      navigate(`/query?s=${encodeURIComponent(searchValue)}`);
    }
  };
  const toggleMenu = () => {
    console.log('clicked');
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/">
          <FontAwesomeIcon icon={faShop} className="me-2" /> <strong>ELextra</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
          <div className="input-group">
            <span className="border-danger input-group-text bg-danger text-white">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control border-danger"
              style={{ color: '#7a7a7a' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="btn btn-danger text-white" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNavDropdown">
          <div className="ms-auto d-none d-lg-block">
            <div className="input-group">
              <span className="border-danger input-group-text bg-danger text-white">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                className="form-control border-danger"
                style={{ color: '#7a7a7a' }}
                value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn btn-danger text-white" onClick={handleSearch}>
              Search
            </button>
            </div>
          </div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link mx-2 text-uppercase text-decoration-none" href="/list/">
                Products
              </a>

            </li>
            <li className="nav-item">
              <a
                className="nav-link mx-2 text-uppercase"
                aria-current="page"
                href="#"
              >
                Offers
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link mx-2 text-uppercase" to="/cart">
                <FontAwesomeIcon icon={faCartPlus} className="me-1" /> Cart
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2 text-uppercase" href="#">
                <FontAwesomeIcon icon={faUserCircle} className="me-1" /> Account
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;