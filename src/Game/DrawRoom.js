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

		this.x = x
		this.y = y
	}

	draw(ctx, current_room) {
		ctx.fillStyle = 'purple';
		let isCurrentRoom = this.title === current_room ? true : false
		ctx.fillRect(this.x, this.y, this.width, this.height)
		if (isCurrentRoom) {
			ctx.fillStyle = 'yellow';
			ctx.fillRect(this.x, this.y, this.width, this.height)
		}
	}

	// update(deltaTime) {
	// 	if(!deltaTime) return;
	// 	this.x += 5 / deltaTime;
	// }
}

export default Room;