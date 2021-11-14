from fastapi import APIRouter
from app.auth import service

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.get("/", status_code=204)
def verify_email() -> None:
    service.send_auth_verification_email()

