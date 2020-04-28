import React, {usere} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Components/Views/Home';
import Login from './Components/Admin/Login';
import Signup from './Components/Admin/Signup';
import Nav from './Components/Labelbar'
import PlayGame from './Game/PlayGame'
// CONTEXTS
import { UserContext } from './Components/Contexts/UserContext';
import { PlayerContext } from './Components/Contexts/PlayerContext';

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
    <UserContext.Provider value={user, setUser}>
      <PlayerContext.Provider value={players, setPlayers}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/play' exact component={PlayGame} />
      
        </Switch>
      </PlayerContext.Provider>
    </UserContext.Provider>
  </div>
  );
}

export default App;
