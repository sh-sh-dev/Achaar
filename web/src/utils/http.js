import axios from 'axios';
export default axios.create({
    timeout: 5000,
    baseURL: 'http://localhost/Achaar/api/',
    method: 'post'
})
