import { useContext } from "react";
import { axiosWithAuth } from "../Components/Utils/AxiosWithAuth";
import { UserContext } from "../Components/Contexts/UserContext";

function Controls() {

	const { user, setUser } = useContext(UserContext);

	const move = (event) => {
		document.onKeyDown = function( event ) {
			switch (event.keyCode) {
				case 37:
					console.log('left')
					break;
				case 38:
					console.log('up')
					
					break;
				case 39:
					console.log('right')
					
					break;
				case 40:
					console.log('down')
					
					break;
				default:
					break;
			}
		}
	}

	// move(direction) {
	// 	axiosWithAuth()
	// 		.post("https://lambda-mud-test.herokuapp.com/api/adv/move/", {"direction": `${direction}`} )
	// 		.then(res => {
	// 			console.log(this.res)
	// 		})
	// 		.catch(err => {
	// 			console.log(this.res)		
	// 		})
	// }
}

export default Controls