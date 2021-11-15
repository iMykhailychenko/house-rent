import emails

from typing import Any, Dict
from fastapi import HTTPException
from emails.template import JinjaTemplate

from config import SMTP_HOST, SMTP_PORT, SMTP_TLS, SMTP_USER, SMTP_PASSWORD


class Message:
    def __init__(self):
        self.smtp = {
            "host": SMTP_HOST,
            "port": SMTP_PORT,
            "tls": SMTP_TLS,
            "user": SMTP_USER,
            "password": SMTP_PASSWORD
        }

    def send(self, html: JinjaTemplate, subject: str, to: str, template_vars: Dict[str, Any]):
        message_params = {
            "html": html,
            "subject": subject,
            "mail_from": ("House rent", SMTP_USER)
        }
        message = emails.Message(**message_params)
        response = message.send(to=to, smtp=self.smtp, render=template_vars)

        if response.status_code != 250:
            raise HTTPException(status_code=500, detail="Internal server error")
