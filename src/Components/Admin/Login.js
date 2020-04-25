import React from 'react'
import {AuthContext} from '../../App'

export default function Login() {
    const { dispatch } = React.useContext(AuthContext);
    const initialState = {
        username: '',
        password: '',
        isSubmitting: false
    };

    const [creds, setCreds] = React.useState(initialState)

    const handleInputChange = e => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log('clicked')
        setCreds({
            ...creds,
            isSubmitting: true
        });
        fetch('https://lambda-mud-test.herokuapp.com/api/login/', {
            method: 'post',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: creds.username,
                password: creds.password
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        })
        .then(resJson => {
            console.log(resJson)
            dispatch({
                type: "LOGIN",
                payload: resJson
            })
        })
        .catch(error => {
            setCreds({
                ...creds,
                isSubmitting: false
            })
            console.log(error)
        });
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
                        value={creds.username}
                        onChange={handleInputChange}
                        />
                    </label>
                    <label> Password
                    <input
                        type='password'
                        name='password'
                        value={creds.password}
                        onChange={handleInputChange}
                        />
                    </label>
                </form>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}


