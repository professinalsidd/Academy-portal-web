import axios from "axios";

const Axios = axios.create({
  baseURL: "https://academy-project-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
