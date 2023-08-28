import styles from "./styles.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const yearsArray = Array.from({ length: 24 }, (_, index) => 2000 + index);
const genres = [
  "Short",
  "Western",
  "Drama",
  "Animation",
  "Comedy",
  "Crime",
  "History",
  "Action",
  "Family",
  "Fantasy",
  "Romance",
  "Music",
  "Horror",
  "Thriller",
  "Mystery",
  "Adventure",
];

const Filters = ({
  sortValue,
  onSortValueChange,
  yearValue,
  onYearChange,
  genreValue,
  onGenreChange,
}) => {
  return (
    <div className={styles.filters}>
      <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortValue}
          label="Sort By"
          onChange={(evt) => onSortValueChange(evt.target.value)}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"release"}>Release</MenuItem>
          <MenuItem value={"rating"}>Rating</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          value={yearValue}
          label="Year"
          onChange={(evt) => onYearChange(evt.target.value)}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {yearsArray.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          value={genreValue}
          label="Genre"
          onChange={(evt) => onGenreChange(evt.target.value)}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
