from enum import Enum


class EmailTypeEnum(Enum):
    CONFIRM_EMAIL = 'confirm-email'
    CHANGE_EMAIL = 'change-email'
    RECOVER_EMAIL = 'recover-email'
    CHANGE_PASSWORD = 'change-password'
