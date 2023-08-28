const baseUrl = () =>
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3001"
    : "https://movie-db-backend-vujl.onrender.com";

const apiUrl = (url) => `${baseUrl()}/${url}`;

export default apiUrl;
