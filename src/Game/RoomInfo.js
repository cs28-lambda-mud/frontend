import React from 'react'

import { UserContext } from '../Components/Contexts/UserContext'
import { PlayerContext } from '../Components/Contexts/PlayerContext'
import {axiosWithAuth} from '../Components/Utils/AxiosWithAuth'

export default function RoomInfo() {

    const { user, setUser } = React.useContext(UserContext)
    const { players, setPlayers } = React.useContext(PlayerContext)

    const [info, setInfo] = React.useState(false)

    React.useEffect(() => {
        if (info === false) {
            setInfo(true)  
            axiosWithAuth()
                .get('/adv/init/')
                .then(res => {
                    console.log(res.data)
                    setUser(
                        {
                            ...user, 
                            name: res.data.name, 
                            title: res.data.title, 
                            description: res.data.description, 
                            room_id: res.data.room_id
                        }
                    )
                setPlayers(res.data.players)
                console.log(res)
            })
                .catch(err => {
                    setInfo(false)
                    console.log(err)
            })
        }
    }, [user, players, info, setPlayers, setInfo, setUser])


    return (
        <div>
            {info === true ? <div><h1>User: {user.name}</h1>
            <h1>Room: {user.title}</h1>
            <h1>Description: {user.description}</h1>
            </div> : <h1>'UNKNOWN'</h1>}
        </div>
    )
    }
