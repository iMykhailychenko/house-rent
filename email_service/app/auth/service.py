import os

from emails.template import JinjaTemplate

from app.auth.schema import AuthVerifyBody, ChangeEmailBody
from utils.enums import EmailTypeEnum
from utils.message import Message
from config import BASE_URL


def send_confirm_email_verification(data: AuthVerifyBody) -> None:
    message = Message()

    dir_name = os.path.dirname(__file__)
    with open(os.path.join(dir_name, "view/confirm_email.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Підтвердження реєстрації на сайті \"House rent\""
        template_vars = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "link": f"{BASE_URL}/api/v1/security/verify?token={data.token}&type={EmailTypeEnum.CONFIRM_EMAIL}",
        }
        message.send(html=template, to=data.email, subject=subject, template_vars=template_vars)


def send_change_email_verification(data: ChangeEmailBody) -> None:
    message = Message()

    dir_name = os.path.dirname(__file__)
    with open(os.path.join(dir_name, "view/change_email.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Підтвердження зміни електронної пошти | \"House rent\""
        new_email_template_vars = {
            "email": data.email,
            "old_email": data.old_email,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "link": f"{BASE_URL}/api/v1/security/verify?token={data.token}&type={EmailTypeEnum.CHANGE_EMAIL}",
        }
        message.send(html=template, to=data.email, subject=subject, template_vars=new_email_template_vars)

    with open(os.path.join(dir_name, "view/recover_email.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Підтвердження зміни електронної пошти | \"House rent\""
        recover_email_template_vars = {
            "email": data.email,
            "old_email": data.old_email,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "link": f"{BASE_URL}/api/v1/security/password?token={data.recover_token}",
        }
        message.send(html=template, to=data.old_email, subject=subject, template_vars=recover_email_template_vars)
