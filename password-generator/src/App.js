import React, { useState, useEffect } from 'react';
import './App.css';
import usePasswordGenerator from './hooks/password-generator';
import PasswordStrengthIndicator from './component/strengthChecker';
import Button from './component/button';
import CheckBox from './component/checkbox';

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxData = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator()

  return (
    <div className="container">

      {/* Password Text and copy */}
      {password && (<div className='header'>
        <div className='title'>{password}</div>
        <Button text={copied ? "Copied" : "Copy"} onClick={handleCopy} CustomClass="copybtn" />
      </div>)}

      {/* Character Length */}
      <div className='charlength'>
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* Checkboxes */}
      <div className='checkboxes'>
        {checkboxData.map((checkbox, index) => {
          return <CheckBox key={index} title={checkbox.title} state={checkbox.state} onChange={() => handleCheckboxData(index)} />
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password} />

      {/* Error Handling */}
      {errorMessage && <div className='errormessage'>{errorMessage}</div>}


      {/* Generate Button */}
      {/* <button className="generatebtn" onClick={() => generatePassword(checkboxData,length)}>Generate Password</button> */}
      <Button text="Generate Password" onClick={() => generatePassword(checkboxData, length)} CustomClass="generatebtn" />

    </div>
  );
}

export default App;
