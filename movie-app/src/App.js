import React from 'react';
import { AuthProvider } from "./AuthContext";
import SignUp from "./SignUp";
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import NewMovieReg from './NewMovieReg';
import EditMovie from './EditMovie';
//const introduction = `<span style="font-weight: bold">Hello</span>`;
function App() {
  return (
    <div className="d-flex align-items-center justify-content-center">
    <Router>
   <AuthProvider>
   <Switch>
     <PrivateRoute exact path="/" component={Dashboard} />
     <Route path="/signup" component={SignUp} />
     <Route path="/login" component={Login} />
     <Route path="/newmovie" component={NewMovieReg} />
     <Route path="/editmovie" component={EditMovie} />
   </Switch> 
   </AuthProvider>
   </Router>
   </div>
  );
}

export default App;

