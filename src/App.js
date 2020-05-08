import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Recommend from "./pages/Recommend";
import Singer from "./pages/Singer";
import Rank from "./pages/Rank";
import Search from "./pages/Search";
import Tab from "./components/Tab";
import Player from "./pages/Player";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Tab />
        <Switch>
          <Redirect path="/" exact to="/recommend" />
          <Route path="/recommend" component={Recommend} />
          <Route path="/singer" component={Singer} />
          <Route path="/rank" component={Rank} />
          <Route path="/search" component={Search} />
        </Switch>
        <Player />
      </div>
    </Router>
  );
}

export default App;
