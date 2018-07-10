import axios from 'axios'

export function getBanner () {
  const url = 'http://localhost:3000/banner';
  return axios.get(url);
}

export function getSongList () {
  const url = 'http://localhost:3000/personalized';
  return axios.get(url);
}

export function getSongListDetail (id) {
  const url = 'http://localhost:3000/playlist/detail?id=' + id;
  return axios.get(url);
}