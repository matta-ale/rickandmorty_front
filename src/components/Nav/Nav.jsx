import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Helpers/PathRouters";
import styles from "./Nav.module.css";

//acá se puede usar NavLink para darle estilos al link

const Nav = (props) => {
  const { onSearch, randomNum, handleLogout } = props;

  return (
    <div className={styles.navDiv}>
      <div className={styles.navButtonGroup}>
        <Link style={{ textDecoration: "none" }} to={ROUTES.HOME}>
          <div className={styles.navButton}>
            <span>Home</span>
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to={ROUTES.ABOUT}>
          <div className={styles.navButton}>
            <span>About</span>
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to={ROUTES.FAVORITES}>
          <div className={styles.navButton}>
            <span>Favorites</span>
          </div>
        </Link>
          <div className={styles.navButton}>
            <button style={{all: 'unset', cursor:'pointer', padding:'20px', translate:'0px -3px'} } onClick={handleLogout}>Log out</button>
          </div>
      </div>
      <SearchBar onSearch={onSearch} randomNum={randomNum} />
    </div>
  );
};

export default Nav;
