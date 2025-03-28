import axios from "axios";

const BASE_URL = "http://192.168.18.93:8080";

export default axios.create({
  baseURL: BASE_URL,
});
