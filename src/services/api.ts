import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-career-coach-backend-ye2g.onrender.com/api/",
});

export default API;
