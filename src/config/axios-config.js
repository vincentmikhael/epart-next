import axios from 'axios';
import Cookies from 'universal-cookie';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'https://epart.kandaradigital.com'
});
const cookies = new Cookies();
if(cookies.get('user')){
instance.defaults.baseURL = 'https://epart.kandaradigital.com';
instance.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.get('user').token;
instance.defaults.headers.post['Content-Type'] = 'application/json';
}


export default instance;