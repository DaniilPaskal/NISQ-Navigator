import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [qubits, setQubits] = useState([]);

  

  return (
    <div className="App">
      <header className="App-header">
        <p>NISQ Navigator</p>
      </header>

      <button name="addQubit">
        Add qubit
      </button>

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
    </div>
  );
}

export default App;
