import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.15.188:5060'

})
export{api};