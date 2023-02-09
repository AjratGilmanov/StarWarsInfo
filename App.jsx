import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'

const App = () => {
  const [selectedTab, setSelectedTab] = useState("people");
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [characters, setCharacters] = useState([]);


  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results);
      });

    fetch("https://swapi.dev/api/planets/")
      .then((res) => res.json())
      .then((data) => {
        setPlanets(data.results);
      });

    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const charactersResult = await axios.get('https://swapi.dev/api/people/');
            setCharacters(charactersResult.data.results);
            const planetsResult = await axios.get('https://swapi.dev/api/planets/');
            setPlanets(planetsResult.data.results);
          } catch (err) {
            setError(err.message);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

  return (
    <div className="App">
      {loading && <div>loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="tabs">
        <div
          className={`tab ${selectedTab === "people" ? "selected" : ""}`}
          onClick={() => handleTabClick("people")}
        >
          <p style={{color:'red'}}>People</p>
        </div>
        <div
          className={`tab ${selectedTab === "planets" ? "selected" : ""}`}
          onClick={() => handleTabClick("planets")}
        >
          <p style={{color:'red'}}>Planets</p>
        </div>
        <div
          className={`tab ${selectedTab === "movies" ? "selected" : ""}`}
          onClick={() => handleTabClick("movies")}
        >
          <p style={{color:'red'}}>Movies</p>
        </div>
      </div>
      {selectedTab === "people" && (
    <div>

      <div className="card-container">
        {people.map((person) => (
          <div key={person.name} className="card">
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${person.url.split("/")[5]}.jpg`}
              alt={person.name}
            />
            <h3>{person.name}</h3>
            <p>Gender: {person.gender}</p>
            <p>Eye color: {person.eye_color}</p>
            <p>Height: {person.height}</p>
          </div>
        ))}
      </div>
    </div>
  )}

  {selectedTab === "planets" && (
    <div>
      <div className="card-container">
        {planets.map((planet) => (
          <div key={planet.name} className="card">
            <img
              src={`https://starwars-visualguide.com/assets/img/planets/${planet.url.split("/")[5]}.jpg`}
              alt={planet.name}
            />
            <h3>{planet.name}</h3>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>
            <p>Population: {planet.population}</p>
          </div>
        ))}
      </div>
    </div>
  )}

  {selectedTab === "movies" && (
    <div>
      <div className="card-container">
        {movies.map((movie) => (
          <div key={movie.title} >
            <div className="card">
            <h3>{movie.title}</h3>
            <p>Episode: {movie.episode_id}</p>
            <p>Director: {movie.director}</p>
            <p>Producer: {movie.producer}</p>
            <p>Release date: {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
  </div>
)}

export default App;