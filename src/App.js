import React from 'react';
import './App.css';

import Home from './Components/Views/Home'
import Login from './Components/Admin/Login';
import Signup from './Components/Admin/Signup';

// CONTEXTS
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
}

// REDUCER FOR LOGIN/LOGOUT

const reducer1 = (state, action) => {
  switch (action.type){
    case "LOGIN":
    localStorage.setItem('user', JSON.stringify(action.payload.user));
    localStorage.setItem('token', JSON.stringify(action.payload.token));
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload.token
    };
    case "REGISTER":
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state
  }
}


function App() {
  const [state, dispatch] = React.useReducer(reducer1, initialState);
  return (
    <AuthContext.Provider
      value={{state, dispatch}}>
      <div className="App">
        <Signup />
        {/* {!state.isAuthenticated ? <Login /> : <Home />} */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
