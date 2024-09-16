import axios from 'axios'

const Axios = axios.create({
    baseURL:'http://localhost:9000/api/users',
    headers :{
        'Content-Type':'application/json'
    }
})

export default Axios