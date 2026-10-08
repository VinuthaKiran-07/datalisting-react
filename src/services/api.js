import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
export const getPosts = async () => (await axios.get(API_URL)).data;
