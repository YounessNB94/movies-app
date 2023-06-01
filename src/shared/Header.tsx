import "./Header.css";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link
        to={"/"}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <h1>MovieApp</h1>
      </Link>
    </header>
  );
};
