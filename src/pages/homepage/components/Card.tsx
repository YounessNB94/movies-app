import { Movie } from "../../../models/Movie";
import "./Card.css";


export const Card = ({ id, title, poster_path }: Movie) => {
  return (
    <div
      key={id}
      className="film-card"
      onClick={(e) => {
        console.log(id);
      }}
    >
      <img
        src={`http://image.tmdb.org/t/p/w500${poster_path}`}
        alt="Film 1"
      />
      <h3>{title}</h3>
    </div>
  );
};
