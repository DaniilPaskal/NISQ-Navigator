import { Circuit } from "../classes/circuit";
import { Gate } from "../classes/gate";

export function parseInput(inputText) {   
    const lines = inputText.trim().split('\n');
    const gates = [];

    // Hadamard, Identity, Pauli X, Pauli Y, Pauli Z
    const singleQubitGates = ["h", "id", "x", "y", "z"];
    // Phase, Rotation X, Rotation Y, Rotation Z
    const thetaGates = ["p", "rx", "ry", "rz"];
    // Controlled Not, Toffoli
    const multiQubitGates = ["cx", "ccx"];

    for (var line in lines) {
      const lineComponents = lines[line].trim().split(' ');

      for (var i = 0; i < lineComponents.length; i++) {
        const gate = lineComponents[i];

        // Not a gate
        if (!isNaN(gate)) {
          continue;
        }

        if (i < lineComponents.length - 1) {
          const target = parseInt(lineComponents[i + 1]);

          // Uncontrolled gates
          if (singleQubitGates.includes(gate)) {
            gates.push(new Gate(gate, target));
          // Theta gates
          } else if (thetaGates.includes(gate)) {
            if (i < lineComponents.length - 2) {
              const theta = parseFloat(lineComponents[i + 2]);

              gates.push(new Gate(gate, target, [], theta));
            } else {

            }
          // Controlled gates
          } else if (multiQubitGates.includes(gate)) {
            if (i < lineComponents.length - 2) {
              var controls = [];

              for (var j = i + 2; j < lineComponents.length; j++) {
                controls.push(parseInt(lineComponents[j]));
              }

              gates.push(new Gate(gate, target, controls));
            } else {
              
            }
          } else {
            alert("Error: .");
          }
        } else {
          
        }

        
      }
    }  

    var qubits = lines.length;

    // Find highest qubit
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