import MovieList from "./Movies/MovieList";
import { Route, Routes } from "react-router-dom";

import "./styles.css";
import MovieDetails from "./Movies/MovieDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/movies/details" element={<MovieDetails />} />
      {/* <Route path="/order-summary" component={OrderSummary} /> */}
      <Route exact path="/" element={<MovieList />} />
      <Route exact path="/movies" element={<MovieList />} />
    </Routes>
  );
}
