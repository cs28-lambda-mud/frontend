import React from 'react';
import './Login.css'

import axios from 'axios';
import { useHistory } from 'react-router-dom'


export default function Login() {

    const history = useHistory()

    const [changes, setChanges] = React.useState({ username: '', password: ''})
    const [ isSubmitting, setIsSubmitting] = React.useState('')
    

    const handleInputChange = e => {
        setChanges({
            ...changes,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('clicked')

        axios.post('https://cs28mudprod.herokuapp.com/api/login/', changes)
        .then(res => {
            localStorage.setItem('token', res.data.key)
            setIsSubmitting('Success')
            history.push('/play')
        })
        .catch(err => {
            console.log(err);
            setIsSubmitting(`${err}`)
        })
    }
        


    return (
        <div className='login'>
            <h2>Login to see and save our game!</h2>
            <div>
                <form style={{display: 'flex', flexDirection: 'column'}}>
                    <label> Username
                    <input
                        style={{marginLeft: '20px'}}
                        type='username'
                        name='username'
                        value={changes.username}
                        onChange={handleInputChange}
                        /><br />
                    </label>
                    <label> Password
                    <input
                        style={{marginLeft: '23px'}}
                        type='password'
                        name='password'
                        value={changes.password}
                        onChange={handleInputChange}
                        />
                    </label>
                </form>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
