import styles from "./styles.module.css";

const MovieImageHolder = ({ imgSrc, altText }) => {
  return (
    <div className={styles.movieImageContainer}>
      {imgSrc && <img src={imgSrc} alt={altText} />}
    </div>
  );
};

export default MovieImageHolder;
