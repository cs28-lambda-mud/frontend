import React from 'react'
import axios from 'axios'

import { useHistory } from 'react-router-dom';



export default function Signup() {
    const history = useHistory()

    const [submitting, setSubmitting] = React.useState(false)
    const [update, setUpdate] = React.useState({username: '', password1: '', password2: ''})

    const handleChange = e => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('clicked')
        
        axios.post('https://cs28mudprod.herokuapp.com/api/registration/', update)
        .then(res => {
            localStorage.setItem('token', res.data.key)
            setSubmitting('Success')
            history.push('/play')
        })
        .catch(err => {
            console.log(err.response.statusText);
            setSubmitting(`${err}`)
        })
    }
        
       
        
    
    return (
        <div style={{color: 'black', outline: 'white', fontSize: '30px', fontWeight: '100'}}>
            <h2 style={{fontSize: '2rem'}}>Signup to see and save our game!</h2>
            <div>
                <form style={{display: 'flex', flexDirection: 'column'}}>
                    <label > Username
                    <input
                        style={{marginLeft: '2.8rem'}}
                        type='username'
                        name='username'
                        value={update.username}
                        onChange={handleChange}
                        />
                    </label>
                    <label> Password
                    <input
                        style={{marginLeft: '3rem'}}
                        type='password'
                        name='password1'
                        value={update.password1}
                        onChange={handleChange}
                        />
                    </label>
                    <label> Password
                    <input
                        style={{marginLeft: '3rem'}}
                        type='password'
                        name='password2'
                        value={update.password2}
                        onChange={handleChange}
                        />
                    </label>
                </form>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
