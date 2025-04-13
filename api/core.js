import axios from "axios";

const BASE_URL = "https://fulusku-api.kobulwidodo.my.id";

export default axios.create({
  baseURL: BASE_URL,
});
