import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export default axios.create({
  baseURL: BASE_URL,
});
