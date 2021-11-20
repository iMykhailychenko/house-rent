import os

from emails.template import JinjaTemplate

from app.auth.schema import ConfirmEmailBody, ChangeEmailBody, ChangePasswordBody
from utils.enums import EmailTypeEnum
from utils.message import Message
from config import BASE_URL

DIR_NAME = os.path.dirname(__file__)
message = Message()


def send_confirm_email(data: ConfirmEmailBody) -> None:
    with open(os.path.join(DIR_NAME, "view/confirm_email.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Підтвердження реєстрації на сайті \"House rent\""
        template_vars = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "link": f"{BASE_URL}/api/v1/security/confirm-email?token={data.token}&type={EmailTypeEnum.CONFIRM_EMAIL}",
        }
        message.send(html=template, to=data.email, subject=subject, template_vars=template_vars)


def send_change_email(data: ChangeEmailBody) -> None:
    with open(os.path.join(DIR_NAME, "view/change_email.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Підтвердження зміни електронної пошти | \"House rent\""
        new_email_template_vars = {
            "email": data.email,
            "old_email": data.old_email,
            "link": f"{BASE_URL}/api/v1/security/confirm-email?token={data.token}&type={EmailTypeEnum.CHANGE_EMAIL}",
        }
        message.send(html=template, to=data.email, subject=subject, template_vars=new_email_template_vars)

    with open(os.path.join(DIR_NAME, "view/recover_email.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Підтвердження зміни електронної пошти | \"House rent\""
        recover_email_template_vars = {
            "email": data.email,
            "old_email": data.old_email,
            "link": f"{BASE_URL}/api/v1/security/restore-email?"
                    f"token={data.recover_token}&type={EmailTypeEnum.CHANGE_EMAIL}",
        }
        message.send(html=template, to=data.old_email, subject=subject, template_vars=recover_email_template_vars)


def send_change_password(data: ChangePasswordBody) -> None:
    with open(os.path.join(DIR_NAME, "view/change_password.html")) as html:
        template = JinjaTemplate(html.read())
        subject = "Зміна пароля на сайті \"House rent\""
        template_vars = {
            "link": f"{BASE_URL}/auth/password?token={data.token}",
        }
        message.send(html=template, to=data.email, subject=subject, template_vars=template_vars)
