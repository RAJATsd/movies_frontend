import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

import MovieCard from "@/components/MovieCard";
import styles from "./styles.module.css";
import {
  fetchChecklistAndLikeStart,
  fetchMoreMoviesStart,
  fetchMovieListStart,
  searchMoreMoviesStart,
} from "./reducer";
import {
  makeSelectMoviesList,
  makeSelectSearchedMovies,
  makeSelectSearchQuery,
  makeSelectWatchlistAndLikes,
} from "./selectors";

const HomePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectMoviesList());
  const { data: searchedMovieData } = useSelector(makeSelectSearchedMovies());
  const { data: watchlistAndLikesData } = useSelector(
    makeSelectWatchlistAndLikes()
  );
  const searchQuery = useSelector(makeSelectSearchQuery());

  const { page, total_pages, results } = data || {};
  const {
    results: searchedMoviesResults,
    page: searchPage,
    total_pages: totalSearchPages,
  } = searchedMovieData || {};
  const doSearchedMovieResultsExist = searchedMoviesResults?.length > 0;

  useEffect(() => {
    if (!results?.length) {
      dispatch(fetchMovieListStart());
    }
  }, [results]);

  useEffect(() => {
    if (!watchlistAndLikesData) {
      dispatch(fetchChecklistAndLikeStart());
    }
  }, [watchlistAndLikesData]);

  const fetchMoreMovies = () => {
    dispatch(fetchMoreMoviesStart(page + 1));
  };

  const handleCardClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  const searchMoreMovies = () => {
    dispatch(
      searchMoreMoviesStart({ query: searchQuery, page: searchPage + 1 })
    );
  };

  return (
    <InfiniteScroll
      dataLength={
        doSearchedMovieResultsExist
          ? searchedMoviesResults.length
          : results?.length || 0
      }
      next={doSearchedMovieResultsExist ? searchMoreMovies : fetchMoreMovies}
      hasMore={
        doSearchedMovieResultsExist
          ? searchPage < totalSearchPages
          : page < total_pages
      }
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className={styles.moviesListContainer}>
        {(doSearchedMovieResultsExist ? searchedMoviesResults : results)?.map(
          ({ _id, imdb, plot, title, poster }) => (
            <MovieCard
              id={_id}
              key={_id}
              title={title}
              rating={imdb?.rating}
              description={plot}
              poster={poster}
              onClick={handleCardClick}
            />
          )
        )}
      </div>
    </InfiniteScroll>
  );
};

export default HomePage;
