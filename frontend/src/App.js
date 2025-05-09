import { useState, useEffect } from "react";
import { Circuit } from "./classes/circuit";
import { Gate } from "./classes/gate";
import './App.css';

function App() {
  const [qubits, setQubits] = useState([]);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState([]);

  const simulate = async (circuit) => {
    parseInput();

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

  const parseInput = () => {   
    const lines = inputText.trim().split('\n');
    const gates = [];

    for (const line in lines) {
      const lineComponents = line.trim().split(' ');

      for (var i; i < lineComponents.length; i++) {
        if (lineComponents[i] === "h") {
          if (i < lineComponents.length) {
            gates.push(new Gate("h"), parseInt(lineComponents[i + 1]));
          }
        } else if (lineComponents[i] === "cx") {
          if (i < lineComponents.length - 1) {
            gates.push(new Gate("cx"), parseInt(lineComponents[i + 1], parseInt(lineComponents[i + 2])));
          }
        }
      }
    }  
    
    const qubits = Math.max(...gates.flatMap(gate => [gate.target, gate.control ?? -1])) + 1;
    const circuit = new Circuit(qubits, gates);
    simulate(circuit);
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
