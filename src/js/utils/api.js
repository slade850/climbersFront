import axios from 'axios';
import config from '../../config';
//config axios for work with cookies
axios.defaults.withCredentials = true;
//init an instance with url of api
const instance = axios.create({
    baseURL: config.API_URL
})


export default instance;