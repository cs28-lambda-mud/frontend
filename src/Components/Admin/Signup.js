import React from 'react'
import {AuthContext} from '../../App'

export default function Signup() {
    const {dispatch} = React.useContext(AuthContext)
    const initialState = {
        username: '',
        password: '',
        isSubmitting: false
    }

    const [newCreds, setNewCreds] = React.useState(initialState)

    const handleChange = e => {
        setNewCreds({
            ...newCreds,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log('clicked')
        setNewCreds({
            ...newCreds,
            isSubmitting: true
        });
        fetch('https://lambda-mud-test.herokuapp.com/api/registration/', {
            method: 'post',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: newCreds.username,
                password1: newCreds.password,
                password2: newCreds.password
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        })
        .then(resJson => {
            dispatch({
                type: 'REGISTER',
                payload: resJson
            })
        })
        .catch(err => {
            console.log(err)
            setNewCreds({
                ...newCreds,
                isSubmitting: false
            })
        })
    }
    return (
        <div>
            <h2>Signup to see and save our game!</h2>
            <div>
                <form>
                    <label> Username
                    <input
                        type='username'
                        name='username'
                        value={newCreds.username}
                        onChange={handleChange}
                        />
                    </label>
                    <label> Password
                    <input
                        type='password'
                        name='password'
                        value={newCreds.password}
                        onChange={handleChange}
                        />
                    </label>
                </form>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
