import './App.css';
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './comps/MovieRow';
import FeaturedMovie from './comps/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);


  useEffect(() => {
    const loadAll = async () => {
      //Get the full list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Get featured movie
      let originals = list.filter(movie => movie.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}