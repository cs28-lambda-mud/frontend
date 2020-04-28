import React from 'react';

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

        axios.post('https://lambda-mud-test.herokuapp.com/api/login/', changes)
        .then(res => {
            localStorage.setItem('token', res.data.key)
            setIsSubmitting('Success')
            history.push('/')
        })
        .catch(err => {
            console.log(err);
            setIsSubmitting(`${err}`)
        })
    }
        


    return (
        <div>
            <h2>Login to see and save our game!</h2>
            <div>
                <form>
                    <label> Username
                    <input
                        type='username'
                        name='username'
                        value={changes.username}
                        onChange={handleInputChange}
                        />
                    </label>
                    <label> Password
                    <input
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
