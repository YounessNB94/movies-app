import { Details } from "./pages/details/Details.tsx";

import React, { useEffect, useState } from "react";

import "./App.css";
import { Header } from "./shared/Header";
import { Filters } from "./pages/homepage/components/Filters";
import { CardsList } from "./pages/homepage/components/CardsList";
import { getData } from "./api/data";
import { Categories } from "./models/Categories.ts";
import { MoviesList } from "./models/MoviesList";
import { Movie } from "./models/Movie.ts";
import { getMovieById } from "./api/Movie.ts";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage/HomePage.tsx";
const App = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
