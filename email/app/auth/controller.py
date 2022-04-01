from fastapi import APIRouter, Body, Response

from app.auth import service
from app.auth.schema import ConfirmEmailBody, ChangeEmailBody, ChangePasswordBody

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/confirm-email")
def verify_email(data: ConfirmEmailBody = Body(...)) -> Response:
    service.send_confirm_email(data)
    return Response(status_code=204)


@router.post("/change-email")
def change_email(data: ChangeEmailBody = Body(...)) -> Response:
    service.send_change_email(data)
    return Response(status_code=204)


@router.post("/change-password")
def change_password(data: ChangePasswordBody = Body(...)) -> Response:
    service.send_change_password(data)
    return Response(status_code=204)
