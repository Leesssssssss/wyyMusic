import axios from 'axios'

export function getRadio() {
  const url = 'http://localhost:3000/personalized/djprogram';
  return axios.get(url);
}

export function getProgram() {
  const url = 'http://localhost:3000/program/recommend';
  return axios.get(url);
}

export function getDujia() {
  const url = 'http://localhost:3000/personalized/privatecontent';
  return axios.get(url);
}