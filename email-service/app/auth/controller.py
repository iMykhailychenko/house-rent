from fastapi import APIRouter, Body

from app.auth import service
from app.auth.schema import AuthVerifyBody

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/", status_code=204)
def verify_email(data: AuthVerifyBody = Body(...)) -> None:
    service.send_auth_verification_email(data)

