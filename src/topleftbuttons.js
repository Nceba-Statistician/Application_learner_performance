import React from 'react';
import './App.css';

const App = () => {
  const handleClick = (buttonName) => {
    alert(`${buttonName} button clicked`);
  };

  return (
    <div className="App">
      <div className="top-left-buttons">
        <button onClick={() => handleClick('Button 1')}>Button 1</button>
        <button onClick={() => handleClick('Button 2')}>Button 2</button>
        <button onClick={() => handleClick('Button 3')}>Button 3</button>
      </div>
      <h1>My React App</h1>
    </div>
  );
};

export default App;
