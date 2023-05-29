import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Details } from "./pages/details/Details.tsx";
const App = () => {
  return (
    <div>
      
      <Details
        title="The Unbearable Weight of Massive Talent"
        poster_path="./public/imgUWOAMT.jpg"
        overview="blabla"
        genre_ids={1}
      />
    </div>
  );
};

export default App;
