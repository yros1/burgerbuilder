import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b40eb.firebaseio.com/'
});

export default instance;