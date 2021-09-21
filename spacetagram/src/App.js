import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./navigation/Navbar";
import ResultsPage from "./pages/ResultsPage"
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Switch>
              <Route path="/" component={ResultsPage} exact />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
