import MovieImageHolder from "../MovieImageHolder";
import styles from "./styles.module.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const MovieCard = ({
  id,
  title = "Harry Potter and The Order Of The Pheionix",
  rating = "10",
  description = "This is the description on the front of everything and harry fights everyone in the scene ",
  poster,
  onClick,
}) => {
  return (
    <div className={styles.movieCard} onClick={() => onClick(id)}>
      <div className={styles.watchlistContainer}>
        <BookmarkIcon htmlColor="lightGrey" />
      </div>
      <MovieImageHolder imgSrc={poster} altText={`${title} poster`} />
      <div className={styles.movieDetails}>
        <div className={styles.nameAndRatingContainer}>
          <div className={styles.movieName}>{title}</div>
          <div className={styles.movieRating}>({rating})</div>
        </div>
        <div className={styles.movieDescription}>{description}</div>
      </div>
    </div>
  );
};

export default MovieCard;
