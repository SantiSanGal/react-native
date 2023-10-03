import axios from 'axios';

const token = localStorage.getItem('token')
console.log('token', token);

export const genesysApi = axios.create({
    baseURL: 'http://192.168.1.219:3333/v1',
    headers: {
        Authorization: `Bearer ${token}`
    }
});