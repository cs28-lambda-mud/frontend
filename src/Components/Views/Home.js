import React from 'react'
import { AuthContext } from '../../App'

export default function Home() {
    return (
        <AuthContext.Consumer>
            {value => <div>{value.user}</div>}
        </AuthContext.Consumer>        
    )
}
