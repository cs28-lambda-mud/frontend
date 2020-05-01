class Room {
	constructor(id, title, description, north=0, south=0, east=0, west=0, x, y) {
		this.width = 40
		this.height = 40

		this.id = id
		this.title = title
		this.description = description

		this.n_to = north
		this.s_to = south
		this.e_to = east
		this.w_to = west

		this.x = x * this.width * 1.25
		this.y = y * this.height * 1.25
	}

	draw(ctx, current_room) {
		ctx.fillStyle = 'green';
		let isCurrentRoom = this.title === current_room ? true : false
		ctx.fillRect(this.x, this.y, this.width, this.height)

		if (isCurrentRoom) {
			ctx.fillStyle = 'blue';
			ctx.fillRect(this.x, this.y, this.width, this.height)
		}

		ctx.font = '15px Arial';
		ctx.fillStyle = 'white';
		ctx.fillText(this.id, this.x + 25, this.y + 15)
	}

	// update(deltaTime) {
	// 	if(!deltaTime) return;
	// 	this.x += 5 / deltaTime;
	// }
}

export default Room;