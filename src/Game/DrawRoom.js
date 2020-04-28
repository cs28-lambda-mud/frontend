class Room {
	constructor(id, title, description, north, south, east, west, x, y) {
		this.width = 20
		this.height = 50

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

	draw(ctx) {
		ctx.fillStyle = 'orange'
		ctx.fillRect(this.x, this.y, this.width, this.height)

		if (this.n_to == true) {
			ctx.fillStyle = 'blue'
			ctx.fillRect(this.x + 12, this.y - 50, (this.width - 30) / 2, this.height)
		}

		if (this.e_to == true) {
			ctx.fillStyle = 'gray'
			ctx.fillRect(this.x + 20, this.y + 20, this.width, (this.height - 15) / 2)
		}

		if (this.s_to == true) {
			ctx.fillStyle = 'green'
			ctx.fillRect(this.x + 12, this.y + 50, (this.width - 30) / 2, this.height)
		}

		if (this.w_to == true) {
			ctx.fillStyle = 'lightblue'
			ctx.fillRect(this.x - 20, this.y + 20, this.width, (this.height - 15) / 2)
		}
	}

	// update(deltaTime) {
	// 	if(!deltaTime) return;
	// 	this.x += 5 / deltaTime;
	// }
}

export default Room;