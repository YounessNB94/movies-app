import "./Header.css";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <a href="#">
          <h1>MovieApp</h1>
        </a>
      </Link>
    </header>
  );
};
