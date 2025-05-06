from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

from app.models.circuit import Circuit

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins = ["*"], allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"])

@app.get("/") 
def ping():     
    return {"message": "Hello World"} 

@app.post("/simulate")
def simulate(data):
    circuit = QuantumCircuit(data.qubits)

    for gate in data.gates:
        if (gate.name == "h"):
            circuit.h(gate.target)
        elif (gate.name == "cx"):
            circuit.cx(gate.control, gate.target)

    simulator = AerSimulator() 
    circuit.save_statevector() 
    result = simulator.run(circuit).result() 
    statevector = result.get_statevector()
    
    return statevector