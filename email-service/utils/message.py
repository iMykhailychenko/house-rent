import emails
from emails.template import JinjaTemplate
from typing import Any, Dict


class Message:
    def __init__(self):
        self.smtp = {"host": "smtp.office365.com", "port": 587, "tls": True, "user": "",
                     "password": ""}

    def send(self, html: JinjaTemplate, subject: str, to: str, template_vars: Dict[str, Any]):
        message = emails.Message(html=html,
                                 subject=subject,
                                 mail_from=("House rent", "ihor.mykh@outlook.com"))

        response = message.send(to=to, smtp=self.smtp, render=template_vars)

        if response.status_code != 250:
            print('message is not sent, retry later')
        else:
            print('ok. message is sent to ', to)
