from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from app.home.service import get_home_page_view

router = APIRouter(tags=["home"])


@router.get("/", response_class=HTMLResponse)
def get_home_page() -> str:
    return get_home_page_view()
