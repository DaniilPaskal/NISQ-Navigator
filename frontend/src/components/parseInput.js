import { Circuit } from "../classes/circuit";
import { Gate } from "../classes/gate";

export function parseInput(inputText) {   
    const lines = inputText.trim().split('\n');
    const gates = [];

    console.log(inputText)
    console.log(lines)

    for (var line in lines) {
      const lineComponents = lines[line].trim().split(' ');

      console.log(lineComponents)

      for (var i = 0; i < lineComponents.length; i++) {
        console.log("current component: " + lineComponents[i])

        if (lineComponents[i] === "h") {
          if (i < lineComponents.length) {
            gates.push(new Gate("h"), parseInt(lineComponents[i + 1], -1));
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
    
    return circuit;
  }