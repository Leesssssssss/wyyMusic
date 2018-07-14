import axios from 'axios'

export function getHotSearch() {
  const url = 'http://localhost:3000/search/hot';
  return axios.get(url);
}

export function getSearch(type,keywords) {
  const url = 'http://localhost:3000/search?type=' + type + '&keywords=' + keywords;
  return axios.get(url);
}