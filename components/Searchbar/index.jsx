import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.css";
import {
  makeSelectSearchedMovies,
  makeSelectSearchQuery,
} from "@/containers/home/selectors";
import {
  searchMovieStart,
  searchMovieSuccess,
  updateSearchQuery,
} from "@/containers/home/reducer";

const SearchBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector(makeSelectSearchedMovies());
  const searchQuery = useSelector(makeSelectSearchQuery());

  const path = router.pathname;
  const isDetailsPage = path === "/movie/[id]";
  const doSearchedMoviesExist = data?.results?.length > 0;

  const handleSearch = () => {
    dispatch(searchMovieStart(searchQuery));
  };

  const handleClearSearch = () => {
    handleUpdateSearchQuery("");
    dispatch(searchMovieSuccess(null));
  };

  const handleUpdateSearchQuery = (query) => {
    dispatch(updateSearchQuery(query));
  };

  return (
    <div className={styles.searchBar}>
      {isDetailsPage ? (
        <span className={styles.pageTitle}>Movie Details</span>
      ) : (
        <div className={styles.inputAndButtons}>
          <div className={styles.searchInput}>
            <SearchIcon />
            <input
              placeholder="Search"
              onChange={(evt) => handleUpdateSearchQuery(evt.target.value)}
              value={searchQuery}
            />
          </div>
          <div>
            <button className={styles.actionButton} onClick={handleSearch}>
              Search
            </button>
            {doSearchedMoviesExist && (
              <button
                className={styles.actionButton}
                onClick={handleClearSearch}
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}

      <HomeIcon />
    </div>
  );
};

export default SearchBar;
