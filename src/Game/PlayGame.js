import React from 'react'
import RoomInfo from './RoomInfo'
import Map from './Map'
import Controls from './Controls'
const PlayGame = () => {
	//const move = Controls.move()
	
    return(
        <div>
            <RoomInfo />
            <Map />
        </div>
    )
}

export default PlayGame