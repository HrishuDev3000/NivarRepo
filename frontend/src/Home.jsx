import React from 'react';
import myImage from './Nivar.png';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <img src={myImage} alt="Nivar" id="pic" />
    </div>
  );
}

export default Home;