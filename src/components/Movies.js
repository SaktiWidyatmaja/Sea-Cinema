'use client'
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard";
import Grid from "@mui/material/Grid"

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
      const response = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
      const data = await response.json();
      console.log(data[0]);
      
      setMovies(data);
  };

  useEffect(() => {
      fetchMovies();
  }, []);

  return (
    <Grid container spacing={1}>
      {movies.map((movie, index) => (
        <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
          <MovieCard
            id = {index}
            image = {movie.poster_url}
            title = {movie.title}
            description = {movie.description}
            price = {movie.ticket_price}
          />
        </Grid>
      ))}
    </Grid>
  );
}