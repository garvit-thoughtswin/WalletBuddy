from jose import jws
from src.core.config import settings

def signJWT(data):
    return jws.sign(data,settings.JWT_SECRET,algorithm="HS256")