import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Views/Home';
import Login from './Components/Admin/Login';
import Signup from './Components/Admin/Signup';

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
      
        </Switch>
      </PlayerContext.Provider>
    </UserContext.Provider>
  </div>
  );
}

export default App;
