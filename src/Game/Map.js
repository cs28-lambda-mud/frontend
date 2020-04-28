import React, { useState, useRef, useEffect } from "react";
import { Card } from "reactstrap";

function Map() {
	const [currentRoom, setCurrentRoom] = useState(null)
	const [isFetching, setIsFetching] = useState(null)
	const [rooms, setRooms] = useState(null)
	const [canvas, setCanvas] = useState(null);
	let canvasRef = useRef(null)

	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.fillStyle = "blue"
		ctx.fillRect(20, 20, 100, 100)
		ctx.fillStyle = "green"
		ctx.fillRect(200, 200, 50, 50)
	}, [canvasRef]);

	return (
		<Card>
			<canvas ref={canvasRef} width="400" height="400" />
		</Card>
	)
}

export default Map;