import axios from 'axios';

const api = axios.create({baseURL: 'https://appcontrolcash.herokuapp.com/controlcash'});

export default api;