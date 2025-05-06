export class Circuit {
    qubits = [];
    gates = [];

    constructor(qubits, gates) {
      this.qubits = qubits;
      this.gates = gates;
    }

    addQubit(qubit) {
        this.qubits.push(qubit);
    }

    addGate(gate) {
      this.gates.push(gate);
    }
  }