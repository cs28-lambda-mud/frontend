import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Labelbar from './Components/Labelbar'

import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from './Components/Utils/PrivateRoute'

import PlayGame from './Game/PlayGame'
// CONTEXTS
import { UserContext } from './Components/Contexts/UserContext';
import { PlayerContext } from './Components/Contexts/PlayerContext';
import Admin from './Components/Admin/Admin';

function App() {

const [user, setUser] = React.useState({
  name: '',
  title: '',
  description: '',
  room_id: '',
  error_msg: ''
})

const [players, setPlayers] = React.useState([])

  return (
  <div className="App">
    <UserContext.Provider value={{user, setUser}}>
      <PlayerContext.Provider value={{players, setPlayers}}>
        <Labelbar />
        <Switch>
          <PrivateRoute exact path='/play' component={PlayGame} />
          {/* <Route exact path='/' component={Login} /> */}
          {/* <Route path='/signup' component={Signup} />       */}
          <Route path='/' component={Admin} />
        </Switch>
      </PlayerContext.Provider>
    </UserContext.Provider>
  </div>
  );
}

export default App;
