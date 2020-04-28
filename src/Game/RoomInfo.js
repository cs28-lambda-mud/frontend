import React from 'react'

import { UserContext } from '../Components/Contexts/UserContext'
import { PlayerContext } from '../Components/Contexts/PlayerContext'
import {axiosWithAuth} from '../Components/Utils/AxiosWithAuth'

export default function RoomInfo() {

    const { user, setUser } = useContext(UserContext)
    const { players, setPlayers } = useContext(PlayerContext)

    const [info, setInfo] = React.useState(false)

    React.useEffect(() => {
        axiosWithAuth()
        .get('https://lambda-mud-test.herokuapp.com/api/adv/init/')
        .then(res => {
            setUser({...user, name: res.data.name, title: res.data.title, description: res.data.description, room_id: res.data.room_id})
            setPlayers(res.data.players)
            setInfo(true)
        })
        .catch(err => {
            setInfo(`${err}`)
        })
    })

    return (
        <div>
            <h1>User: {user.name}</h1>
            <h1>Room: {user.title}</h1>
            <h1>Description: {user.description}</h1>
            <h1>Room ID: {user.room_id}</h1>
        </div>
    )
}
