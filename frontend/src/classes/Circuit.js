export class Circuit {
    qubits = 0;
    gates = [];

    constructor(qubits, gates) {
      this.qubits = qubits;
      this.gates = gates;
    }

    setQubits(qubits) {
        this.qubits = qubits;
    }

    setGates(gates) {
      this.gates = gates;
    }
  }