from pydantic import BaseModel
from app.models.gate import Gate

class Circuit(BaseModel):     
    qubits: int     
    gates: list[Gate]