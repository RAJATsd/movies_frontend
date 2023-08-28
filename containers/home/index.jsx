import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

import MovieCard from "@/components/MovieCard";
import Filters from "@/components/Filters";
import styles from "./styles.module.css";
import {
  addChecklistAndLikeStart,
  fetchChecklistAndLikeStart,
  fetchMoreMoviesStart,
  fetchMovieListStart,
  removeChecklistAndLikeStart,
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
  const [sortValue, setSortValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [genreValue, setGenreValue] = useState("");

  const { page, total_pages, results } = data || {};
  const {
    results: searchedMoviesResults,
    page: searchPage,
    total_pages: totalSearchPages,
  } = searchedMovieData || {};
  const doSearchedMovieResultsExist = searchedMoviesResults?.length > 0;
  const filtersObject = {
    sortBy: sortValue,
    year: yearValue,
    genre: genreValue,
  };

  useEffect(() => {
    if (!results?.length) {
      dispatch(fetchMovieListStart());
    }
  }, [results]);

  useEffect(() => {
    if (!searchQuery.length) {
      dispatch(fetchMovieListStart(filtersObject));
    }
  }, [sortValue, yearValue, genreValue, searchQuery]);

  useEffect(() => {
    if (!watchlistAndLikesData) {
      dispatch(fetchChecklistAndLikeStart());
    }
  }, [watchlistAndLikesData]);

  const fetchMoreMovies = () => {
    dispatch(fetchMoreMoviesStart({ page: page + 1, ...filtersObject }));
  };

  const handleCardClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  const searchMoreMovies = () => {
    dispatch(
      searchMoreMoviesStart({ query: searchQuery, page: searchPage + 1 })
    );
  };

  const onWatchListClick = (movieId, isWatchlisted) => {
    if (isWatchlisted) {
      dispatch(removeChecklistAndLikeStart({ movieId, entity: "watchlist" }));
    } else {
      dispatch(addChecklistAndLikeStart({ movieId, entity: "watchlist" }));
    }
  };

  const onLikeClick = (movieId, isLiked) => {
    if (isLiked) {
      dispatch(removeChecklistAndLikeStart({ movieId, entity: "like" }));
    } else {
      dispatch(addChecklistAndLikeStart({ movieId, entity: "like" }));
    }
  };

  const onSortValueChange = (val) => {
    setSortValue(val);
  };

  const onYearChange = (val) => {
    setYearValue(val);
  };

  const onGenreChange = (val) => {
    setGenreValue(val);
  };

  return (
    <>
      <Filters
        sortValue={sortValue}
        onSortValueChange={onSortValueChange}
        yearValue={yearValue}
        onYearChange={onYearChange}
        genreValue={genreValue}
        onGenreChange={onGenreChange}
      />
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
                onWatchListClick={onWatchListClick}
                onLikeClick={onLikeClick}
                isWatchListed={!!watchlistAndLikesData?.watchlist?.[_id]}
                isLiked={!!watchlistAndLikesData?.like?.[_id]}
              />
            )
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default HomePage;
