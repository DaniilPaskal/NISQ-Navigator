from pydantic import BaseModel
from gate import Gate

class Circuit(BaseModel):     
    qubits: int     
    gates: list[Gate]