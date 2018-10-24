import axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://burgerbuilder-949ce.firebaseio.com/'
})

export default instanse;