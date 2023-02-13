import React, { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import "./MovieList.scss";

const MovieList = () => {
  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([]);
  const [currentDataLength, setCurrentDataLength] = useState(0);
  const [queryTxt, setQueryText] = useState("");
  const [page_no, setPage_no] = useState(1);

  const checkScrollEnd = () => {
    const isBottom =
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.scrollHeight;
    return window.pageYOffset !== 0 && isBottom;
  };

  const handleScroll = debounce(async () => {
    const isEnd = checkScrollEnd();
    if (isEnd) {
      try {
        //don't increment page_no if data is empty or if fetched data is less than limit
        if (currentDataLength >= 10) {
          getMoviesList(queryTxt, page_no + 1);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          // toast.error("Something went wrong. Try again later");
        }
      }
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const getMoviesList = async (values, page, type) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=b9bd48a6&s=${values}&page=${page}`
    );
    if (type === "new") {
      setMovieList(
        response && response.data && response.data.Search
          ? response.data.Search
          : []
      );
    } else {
      setMovieList(
        response && response.data && response.data.Search
          ? [...movieList, ...response.data.Search]
          : []
      );
    }

    setCurrentDataLength(
      response && response.data && response.data.Search
        ? response.data.Search.length
        : 0
    );
    setPage_no(page);
  };

  const handleSearch = () => {
    setMovieList([]);
    getMoviesList(queryTxt, 1, "new");
  };

  const handleGetMovieDetails = (imdb_id) => {
    navigate("/movies/details");
    navigate("/movies/details", {
      state: {
        imdb: imdb_id
      }
    });
  };

  return (
    <div className="movie-list-wrapper">
      <div className="navigation-header">
        <div className="navigation-title">Search</div>
      </div>
      <div className="search-bar-head">
        <input
          type="text"
          name="query"
          alt="movie search"
          placeholder="search movie..."
          onChange={(evt) => setQueryText(evt.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      {movieList.length > 0 ? (
        <div className="movie-list-wrap">
          {movieList.map((movie) => {
            return (
              <div onClick={() => handleGetMovieDetails(movie.imdbID)}>
                <div
                  className="movie-card"
                  style={{ backgroundImage: `url('${movie.Poster}')` }}
                ></div>
                <div className="movie-title">{movie.Title}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-data">Please type and search for movies...</div>
      )}
    </div>
  );
};

export default MovieList;
