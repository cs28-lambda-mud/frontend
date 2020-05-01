import axios from 'axios'

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token')


    return axios.create({
    	baseURL: 'https://cs28mud.herokuapp.com/api',
        headers: {
            Authorization: `Token ${token}`
        }
    })
}