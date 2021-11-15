import os
from datetime import date

from emails.template import JinjaTemplate

from app.auth.schema import AuthVerifyBody
from utils.message import Message
from config import BASE_URL


def send_auth_verification_email(data: AuthVerifyBody) -> None:
    dir_name = os.path.dirname(__file__)
    with open(os.path.join(dir_name, "view.html")) as html:
        template = JinjaTemplate(html.read())

    subject = "Підтвердження реєстрації на сайті \"House rent\""
    template_vars = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "link": f"{BASE_URL}/api/v1/users/verify?token={data.token}",
        "registration_date": date.today().strftime("%d-%m-%Y")
    }
    message = Message()
    message.send(html=template, to=data.email, subject=subject, template_vars=template_vars)
