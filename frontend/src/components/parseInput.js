import { Circuit } from "../classes/circuit";
import { Gate } from "../classes/gate";

export function parseInput(inputText) {   
    const lines = inputText.trim().split('\n');
    const gates = [];

    // Hadamard, Identity, Pauli X, Pauli Y, Pauli Z
    const singleQubitGates = ["h", "id", "x", "y", "z"];
    // Controlled Not, Toffoli
    const multiQubitGates = ["cx", "ccx"];
    // Phase, Rotation X, Rotation Y, Rotation Z
    const thetaGates = ["p", "rx", "ry", "rz"];

    for (var line in lines) {
      const lineComponents = lines[line].trim().split(' ');

      // Uncontrolled gates
      if (singleQubitGates.includes(lineComponents[i])) {
        gates.push(new Gate(lineComponents[i], parseInt(lineComponents[i + 1])));
      // Controlled gates
      } else if (multiQubitGates.includes(lineComponents[i])) {
        var controlQubits = [];

        for (var i = 2; i < lineComponents.length; i++) {
          controlQubits.push(lineComponents[i]);
        }

        gates.push(new Gate(lineComponents[i], parseInt(lineComponents[i + 1], controlQubits)));
      } else if (thetaGates.includes(lineComponents[i])) {
        gates.push(new Gate(lineComponents[i]), parseInt(lineComponents[i + 1]), [], parseInt(lineComponents[i + 2]))
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