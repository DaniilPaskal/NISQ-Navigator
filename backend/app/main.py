from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator, NoiseModel, depolarizing_error

from app.models.circuit import Circuit

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins = ["*"], allow_credentials = True, allow_methods = ["*"], allow_headers = ["*"])

@app.get("/") 
def ping():     
    return {"message": "Hello World"} 

@app.post("/simulate")
async def simulate(circuit: Circuit):
    q_circuit = QuantumCircuit(circuit.qubits + 1)

    for gate in circuit.gates:
        if (gate.name == "h"):
            q_circuit.h(gate.target)
        elif (gate.name == "cx"):
            q_circuit.cx(gate.control, gate.target)

    simulator = AerSimulator() 
    q_circuit.save_statevector() 
    result = simulator.run(q_circuit).result() 
    statevector = result.get_statevector()
    
    return statevector

