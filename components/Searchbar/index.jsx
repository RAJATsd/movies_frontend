import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

import styles from "./styles.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.inputAndButtons}>
        <div className={styles.searchInput}>
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <div>
          <button className={styles.actionButton}>Search</button>
        </div>
      </div>
      <HomeIcon />
    </div>
  );
};

export default SearchBar;
