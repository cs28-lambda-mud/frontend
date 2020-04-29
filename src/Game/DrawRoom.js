class Room {
	constructor(id, title, description, north=0, south=0, east=0, west=0, x, y) {
		this.width = 18
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
		ctx.fillStyle = 'orange';
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}

	// update(deltaTime) {
	// 	if(!deltaTime) return;
	// 	this.x += 5 / deltaTime;
	// }
}

export default Room;