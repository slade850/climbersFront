import axios from 'axios';

export const servURL = 'https://fastblock.fr/'
//config axios for work with cookies
axios.defaults.withCredentials = true;
//init an instance with url of api
const instance = axios.create({
    baseURL: 'https://fastblock.fr/api/'
})


export default instance;