import './App.css';
import React from 'react'
import Navbar from "./components/Navbar/Navbar";
import MediaCard from './components/HowItWork/Cards';
import Front from './components/Front';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Front/>
      <div id="text" style={{background:"linear-gradient(90deg, #1d3f5e, #5890c4)",paddingTop:"30px"}}>How it works?</div>
      <MediaCard/>
    </div>
  );
}
export default App;
