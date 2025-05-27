import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})

export const products = axios.create({
  baseURL: 'https://fakestoreapi.com/',
})


