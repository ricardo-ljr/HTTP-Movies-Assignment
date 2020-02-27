import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

export default function UpdateMovie(props) {
  console.log("update props", props);

  const [movie, setMovie] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movieList, id]);

  const handleChange = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = value.split(",");
    }
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log("update res", res);
        props.getMovieList();
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="update-form">
      <form onSubmit={handleSubmit}>
        <input
          value={movie.title}
          label="Title"
          name="title"
          onChange={handleChange}
          fullWidth
        />
        <input
          value={movie.director}
          label="Director"
          name="director"
          onChange={handleChange}
          fullWidth
        />
        <input
          value={movie.metascore}
          label="Metascore"
          name="metascore"
          onChange={handleChange}
          fullWidth
        />
        <input
          value={movie.stars}
          label="Stars"
          name="stars"
          onChange={handleChange}
          multiline
          fullWidth
        />
        <button variant="contained" type="submit" color="primary" fullWidth>
          Update Movie.
        </button>
      </form>
    </div>
  );
}
