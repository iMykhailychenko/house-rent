import os

# email
SMTP_TLS = True
SMTP_PORT = 587
SMTP_HOST = os.environ.get("EMAIL_HOST", "smtp.office365.com")
SMTP_USER = os.environ.get("EMAIL_HOST_USER")
SMTP_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")

# app
EMAIL_APP_PORT = int(os.environ.get("EMAIL_APP_PORT", 8000))
EMAIL_APP_HOST = os.environ.get("EMAIL_APP_HOST", "0.0.0.0")
BACKEND_API_URL = os.environ.get("BACKEND_API_URL", "http://localhost:8000/auth/verify")
