from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error

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
        elif (gate.name == "id"):
            q_circuit.h(gate.target)
        elif (gate.name == "x"):
            q_circuit.h(gate.target)
        elif (gate.name == "y"):
            q_circuit.h(gate.target)
        elif (gate.name == "z"):
            q_circuit.h(gate.target)
        elif (gate.name == "cx"):
            q_circuit.cx(gate.control[0], target_qubit=gate.target)
        elif (gate.name == "ccx"):
            q_circuit.ccx(gate.control[0], gate.control[1], gate.target)
        elif (gate.name == "p"):
            q_circuit.p(gate.target, gate.theta)
        elif (gate.name == "rx"):
            q_circuit.rx(gate.target, gate.theta)
        elif (gate.name == "ry"):
            q_circuit.ry(gate.target, gate.theta)
        elif (gate.name == "rz"):
            q_circuit.rz(gate.target, gate.theta)

    noise_model = get_noise_model()
    simulator = AerSimulator(noise_model=noise_model) 
    q_circuit.save_statevector() 
    result = simulator.run(q_circuit).result() 
    statevector = result.get_statevector()
    
    return statevector

def get_noise_model():
    noise_model = NoiseModel()
    noise_model.add_all_qubit_quantum_error(depolarizing_error(0.05, 1), ['h']) 
    noise_model.add_all_qubit_quantum_error(depolarizing_error(0.05, 2), ['cx'])

    return noise_model

