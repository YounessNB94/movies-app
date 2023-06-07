import "./Header.css";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link
        to={"/"}
        // you dont need the onClick, Link is a <a> not a <button> and the "to" attribute handle it for you
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <h1>MovieApp</h1>
      </Link>
    </header>
  );
};
