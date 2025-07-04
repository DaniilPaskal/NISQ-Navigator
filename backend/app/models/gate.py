from pydantic import BaseModel
from typing import Optional

class Gate(BaseModel):     
    name: str
    target: int
    control: Optional[int] = None
    theta: float