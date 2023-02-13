import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./MovieDetails.scss";

const MovieDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const imdb = location && location.state && location.state.imdb;

  const [movieDetail, setMovieDetail] = useState([]);

  const getMovieDetails = async () => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=b9bd48a6&i=${imdb}`
    );
    console.log(response);
    setMovieDetail(response.data);
  };

  useEffect(() => {
    if (imdb) getMovieDetails();
  }, []);

  return (
    <div className="movie-details-wrapper">
      <div className="navigation-header">
        <div className="navigation-title-detail">
          <Link
            to={{
              pathname: `/movies`,
              state: {}
            }}
            className="path"
          >
            <span>Back</span>
          </Link>
        </div>
      </div>
      {movieDetail.Title && (
        <div className="movie-details-head">
          <div>
            <img src={movieDetail.Poster} alt="/>" />
          </div>
          <div>
            <label>{movieDetail.Title}</label>
            <p>{movieDetail.Actors}</p>
            <div>{movieDetail.Genre}</div>
            <div>{movieDetail.Director}</div>
            <div>{movieDetail.Language}</div>
            <div>{movieDetail.imdbRating}</div>
            <div>{movieDetail.Plot}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
