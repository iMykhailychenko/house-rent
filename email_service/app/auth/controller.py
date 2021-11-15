from fastapi import APIRouter, Body, Response

from app.auth import service
from app.auth.schema import AuthVerifyBody

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/")
def verify_email(data: AuthVerifyBody = Body(...)) -> Response:
    service.send_auth_verification_email(data)
    return Response(status_code=204)

