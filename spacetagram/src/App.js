import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navigation/Navbar";
import ResultsPage from "./pages/ResultsPage";
function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <ResultsPage />
        </div>
      </div>
    </>
  );
}

export default App;
