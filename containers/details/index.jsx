import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import MovieImageHolder from "@/components/MovieImageHolder";
import styles from "./styles.module.css";
import { fetchMovieDetailsStart } from "./reducer";
import { makeSelectMovieDetails } from "./selectors";

const MovieDetailsContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectMovieDetails());

  const { id: movieId } = router.query;
  const { title, released, runtime, imdb, plot, poster, cast } = data || {};

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetailsStart(movieId));
    }
  }, [movieId]);

  return (
    <div className={styles.movieDetailsContainer}>
      <div className={styles.movieImageWrapper}>
        <MovieImageHolder imgSrc={poster} altText={`${title} poster`} />
      </div>
      <div className={styles.movieInfo}>
        <div className={styles.title}>
          {title} ({imdb?.rating})
        </div>
        <div className={styles.metadata}>
          {released?.substring(0, 4)} |{" "}
          {runtime && (
            <span>
              {`${Math.trunc(runtime / 60) > 9 ? "" : 0}${Math.trunc(
                runtime / 60
              )}`}
              :{`${runtime % 60 > 9 ? "" : 0}${runtime % 60}`}
            </span>
          )}
        </div>
        <div className={styles.cast}>
          Cast: {cast?.map((actor) => `${actor}, `)}
        </div>
        <div className={styles.description}>Description: {plot}</div>
      </div>
    </div>
  );
};

export default MovieDetailsContainer;
