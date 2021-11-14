import os

from emails.template import JinjaTemplate
from utils.message import Message


def send_auth_verification_email() -> None:
    dir_name = os.path.dirname(__file__)
    with open(os.path.join(dir_name, "view.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Email verification for user ddd"

        template_vars = {
            "email": "test@mail.ru"
        }

        message = Message()
        message.send(html=template, to='igor.c.m@ukr.net', subject=subject, template_vars=template_vars)
