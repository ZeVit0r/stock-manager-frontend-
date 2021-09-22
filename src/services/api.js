import axios from "axios";

const api = axios.create({
  baseURL: "https://stock-manager-ze.herokuapp.com",
});

export default api;