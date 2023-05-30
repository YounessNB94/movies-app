import { Movie } from "../../../models/Movie";
import "./Card.css";
import { Link } from "react-router-dom";

export const Card = ({ id, title, name, poster_path }: Movie) => {
  

  return (
    <Link to={"/details"} state={{ id: id }}>
      <div key={id} className="film-card">
        <img
          src={`http://image.tmdb.org/t/p/w500${poster_path}`}
          alt="Film 1"
        />
        <h3>{title ? title : name}</h3>
      </div>
    </Link>
  );
};
