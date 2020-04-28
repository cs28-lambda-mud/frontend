class Controls {
	constructor() {
		document.addEventListener('keydown', event => {
			alert(event.keyCode)
		})
	}
}

export default Controls