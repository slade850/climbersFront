import axios from 'axios';

export const servURL = 'http://fastblock.fr:4000/'
//config axios for work with cookies
axios.defaults.withCredentials = true;
//init an instance with url of api
const instance = axios.create({
    baseURL: 'http://fastblock.fr:4000/api/'
})


export default instance;