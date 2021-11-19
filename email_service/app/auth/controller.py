from fastapi import APIRouter, Body, Response

from app.auth import service
from app.auth.schema import AuthVerifyBody, ChangeEmailBody

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/confirm-email")
def verify_email(data: AuthVerifyBody = Body(...)) -> Response:
    service.send_confirm_email_verification(data)
    return Response(status_code=204)


@router.post("/change-email")
def change_email(data: ChangeEmailBody = Body(...)) -> Response:
    service.send_change_email_verification(data)
    return Response(status_code=204)
