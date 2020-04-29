import React, { useState, useRef, useEffect } from "react";
import { Card } from "reactstrap";
import Room from "./DrawRoom";

function Map() {
	const GAME_WIDTH = 400;
	const GAME_HEIGHT = 400;
	const [currentRoom, setCurrentRoom] = useState(null)
	const [isFetching, setIsFetching] = useState(null)
	const [rooms, setRooms] = useState(null)
	let canvasRef = useRef(null)
	let ctx;

	let room = new Room(12, "mock room", "this is my first mock room", true, true, true, true, 100, 100);
	let lastTime = 0;
	useEffect(() => {
		ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, 400, 400)
		room.draw(ctx)
	}, [room, ctx]);

	// function gameLoop(timestamp) {
	// 	let deltaTime = timestamp - lastTime;
	// 	lastTime = timestamp
	// 	ctx.clearRect(0, 0, 400, 400);
	// 	room.update(deltaTime)
	// 	room.draw(ctx)

	// 	requestAnimationFrame(gameLoop);
	// }

	return (
		<Card>
			<canvas ref={canvasRef} width="400" height="400" />
		</Card>
	)
}

export default Map;