import axios from 'axios'

export function getRank (idx) {
  const url = 'http://localhost:3000/top/list?idx=' + idx;
  return axios.get(url);
}