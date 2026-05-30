import axios from "axios";

const API = axios.create({
  baseURL: "https://et-intellibrief.onrender.com/",
});

export default API;
