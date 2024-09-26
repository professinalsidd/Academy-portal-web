import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
