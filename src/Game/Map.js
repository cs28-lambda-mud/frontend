import React, { useState, useRef, useEffect } from "react";
import { axiosWithAuth } from "../Components/Utils/AxiosWithAuth";
import Room from "./DrawRoom";
import { Container, Row, Col } from "reactstrap";
import '../index.css';

function Map() {
	const [currentRoom, setCurrentRoom] = useState(null)
	const [isFetching, setIsFetching] = useState(null)
	const [rooms, setRooms] = useState(null)
	const [canvas, setCanvas] = useState(null)
	let canvasRef = useRef(null)
	let ctx;

	useEffect(() => {
		if ( rooms == null ) {
			axiosWithAuth()
				.get("https://lambda-mud-test.herokuapp.com/api/adv/rooms/")
				.then(res => {
					const json = res.data.rooms
					const object = JSON.parse(json)
					setRooms(object)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, [rooms, setRooms])

	useEffect(() => {
		if ( rooms != null ) {
			// ctx = canvasRef.current.getContext('2d');
			// ctx.clearRect(0, 0, 400, 400)
			// room.draw(ctx)
			drawRooms(rooms)
		}
	}, [drawRooms]);

	function drawRooms(rooms) {
		ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, 400, 400)
		let canvas_width = ctx.canvas.clientWidth
		let canvas_height = ctx.canvas.clientHeight
		
		rooms.map(room => {
			let roomFields = room.fields
			console.log(roomFields)
			console.log(canvas_width, canvas_height)
			let r = new Room(room.pk, 
					roomFields.title,
					roomFields.description, 
					roomFields.n_to, 
					roomFields.s_to, 
					roomFields.e_to, 
					roomFields.w_to,
					100, 100
			)
			return r.draw(ctx)
		})
	}
	// function gameLoop(timestamp) {
	// 	let deltaTime = timestamp - lastTime;
	// 	lastTime = timestamp
	// 	ctx.clearRect(0, 0, 400, 400);
	// 	room.update(deltaTime)
	// 	room.draw(ctx)

// 	// 	requestAnimationFrame(gameLoop);
// 	// }

	return (
		<Container>
			<Row>
				<Col>
				<canvas ref={canvasRef} className="canvas" />
				</Col>
			</Row>
		</Container>
	)
}

export default Map;