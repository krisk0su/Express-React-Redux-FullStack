import axios from "axios";

const KEY = "AIzaSyCvjQor9xcgKyjazgSEngBB3P0XOEDcmFY";

export const baseParams = {
  part: "snippet",
  maxResults: 5,
  key: KEY
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
