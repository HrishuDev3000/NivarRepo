import React, { useState } from 'react';
import myImage from './Nivar.png'; // Ensure this path is correct
import './Home.css';

function Home() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const handleClick = () => {
    const userInput = prompt('Please enter something:');
    if (userInput === "Nivaar") {
      alert('You entered correctly');
      setIsOverlayVisible(false); // Hide the overlay and allow interaction
    } else {
      alert('Nice try Feds!');
    }
  };

  return (
    <div>
      {isOverlayVisible && (
        <div className="overlay" id="overlay">
          <button onClick={handleClick} id = "password">Password </button>
        </div>
      )}
      <div className={`container ${isOverlayVisible ? 'frozen' : ''}`}>
        <img src={myImage} alt="Nivar" id="pic" />
      </div>
    </div>
  );
}

export default Home;