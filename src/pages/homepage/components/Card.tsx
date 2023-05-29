import "./Card.css";

import { useNavigate } from "react-router-dom";

type movie = {
  id: number;
  title: string;
  img: string;
};

export const Card = ({ id, title, img }: movie) => {
  return (
    <div
      key={id}
      className="film-card"
      onClick={(e) => {
        console.log(id);
      }}
    >
      <img src={`http://image.tmdb.org/t/p/w500${img}`} alt="Film 1" />
      <h3>{title}</h3>
    </div>
  );
};
