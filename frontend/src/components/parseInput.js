import { Circuit } from "../classes/circuit";
import { Gate } from "../classes/gate";

export function parseInput(inputText) {   
    const lines = inputText.trim().split('\n');
    const gates = [];

    for (var line in lines) {
      const lineComponents = lines[line].trim().split(' ');


      for (var i = 0; i < lineComponents.length; i++) {


        // Uncontrolled gates
        if (lineComponents[i] === "h") {
          if (i < lineComponents.length) {
            gates.push(new Gate("h", parseInt(lineComponents[i + 1]), -1));
          }
        } else if (lineComponents[i] === "id") {
          if (i < lineComponents.length - 1) {
            gates.push(new Gate("id", parseInt(lineComponents[i + 1]), -1));
          }
        else if (lineComponents[i] === "pauli") {
          if (i < lineComponents.length - 1) {
            gates.push(new Gate("pauli", parseInt(lineComponents[i + 1]), -1));
          }
        // Controlled gates
        } else if (lineComponents[i] === "cx") {
          if (i < lineComponents.length - 1) {
            gates.push(new Gate("cx", parseInt(lineComponents[i + 1], parseInt(lineComponents[i + 2]))));
          }
        }
      }
    }  

    const qubits = lines.length;

    for (var gate in gates) {
      if (gates[gate].control > qubits) {
        qubits = gates[gate].control;
      }
      if (gates[gate].target > qubits) {
        qubits = gates[gate].target;
      }
    }
    
    const circuit = new Circuit(qubits, gates);
    
    return circuit;
  }