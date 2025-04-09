import React from "react";
import MovieCard from "./MovieCard";

const MovieComponents = ({ movieInfo }) => {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>List Of Cards</h1>
        <div className="grid grid-three-column">
          {movieInfo.map((currVal, id) => {
            return <MovieCard key={id} myData={currVal} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieComponents;
