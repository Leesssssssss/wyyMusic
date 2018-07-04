import axios from 'axios'

export function getSinger() {
  const url = 'http://localhost:3000/top/artists?limit=100';
  return axios.get(url);
}