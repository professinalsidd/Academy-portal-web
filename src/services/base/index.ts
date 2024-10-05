import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_LOCAL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
