import React, {useEffect, useState} from "react";

import Movie from "./components/Movie";

const faetured_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const search_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App(){
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(faetured_API).then((res) => res.json()).then((data) => {
      console.log(data);
      setMovies(data.results);
    });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
      fetch(search_API + searchTerm).then((res) => res.json()).then((data) => {
        setMovies(data.results);
      });
  
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return(
    <React.Fragment>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className="search" type="text" placeholder="Search" value={searchTerm} onChange={handleOnChange}/>
        </form>
      </header>

      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie}></Movie>)}
      </div>
    </React.Fragment>
    
  ); 
}

export default App;
