import { useState, useEffect } from "react";
import { Circuit } from "./classes/circuit";
import { Gate } from "./classes/gate";
import { parseInput } from "./components/parseInput";
import './App.css';

function App() {
  const [qubits, setQubits] = useState([]);
  const [gates, setGates] = useState([]);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState([]);

  const simulate = async () => {
    const circuit = parseInput(inputText);
    setQubits(circuit.qubits);
    setGates(circuit.gates);

    await fetch('http://localhost:8080/simulate/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(circuit)
    })
    .then(response => response.json())
    .then(result => {
      setResult(result);
    })
    .catch(err => {
        alert("Error simulating circuit");
    });
  }

  return (
    <div className="App">
      <header>
        <p>NISQ Navigator</p>
      </header>

      <textarea name="circuitInput" value={inputText} onChange={(e) => setInputText(e.target.value)} rows={8} />

      <div className="circuit">   
        {qubits.map((qubit) => (
          <div className="qubit-row" key={qubit}>
            {gates.map((gate) => (
              gate.target === qubit || gate.control === qubit ? (           
                <div key={gate} className="gate">
                  {gate.name}
                </div>         
              ) : (
                <div key={gate} className="empty-slot" />         
              )       
            ))}     
          </div>   
        ))} 
      </div> 

      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error) => 
            <p key={error}>{error}</p>
          )}   
        </div>
      )} 

      <button name="simulate" onClick={simulate}>
        Simulate
      </button>

      <div>
        <label for="result">Result:</label>
        <input name="result" value={result} disabled/>
      </div>
      
    </div>
  );
}

export default App;
