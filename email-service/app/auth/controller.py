from fastapi import APIRouter
from app.auth import service

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.get("/")
def verify_email():
    service.send_auth_verification_email()

