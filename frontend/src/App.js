import { useState, useEffect } from "react";
import { Circuit } from "./classes/circuit";
import { Gate } from "./classes/gate";
import './App.css';

function App() {
  const [qubits, setQubits] = useState([]);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const circuit = new Circuit();
  const gates = [];

  const simulate = async () => {
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
    
    for (const line in lines) {
      const lineComponents = line.trim().split(' ');
    }    
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
            {gates.map((g, i) => (
              g.target === qubit || g.control === qubit ? (           
                <div key={i} className="gate">
                  {g.name}
                </div>         
              ) : (
                <div key={i} className="empty-slot" />         
              )       
            ))}     
          </div>   
        ))} 
      </div> 

      <button name="simulate" onClick={simulate}>
        Simulate
      </button>

      <p>
        {result}
      </p>
    </div>
  );
}

export default App;
