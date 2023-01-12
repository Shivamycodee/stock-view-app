import axios from 'axios';

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: "ceug31qad3i6ffmfjnsgceug31qad3i6ffmfjnt0",
  },
});