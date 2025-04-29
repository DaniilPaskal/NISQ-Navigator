import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [qubits, setQubits] = useState([]);
  const circuit = new Circuit();
  const gates = [];

  const simulate = async () => {
    parseInput();

    await fetch('http://localhost:8080/simulate/' + CurrentUser.userId, {
      method: 'POST',
      body: JSON.stringify(circuit)
    })
    .then()
    .catch(err => {
        alert("Error simulating circuit");
    });
  }

  const parseInput = (input) => {   
    const lines = input.trim().split('\n');   
    
    for (const line in lines) {
      const lineComponents = line.trim().split(' ');
    }    
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>NISQ Navigator</p>
      </header>

      <textarea name="circuitInput" value={inputText} onChange={(e) => setInputText(e.target.value)} rows={8} />

      <div className="circuit">   
        {qubits.map((qubit) => (
          <div className="qubit-row" key={q}>
            {gates.map((g, i) => (
              g.target === q || g.control === q ? (           
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
    </div>
  );
}

export default App;
