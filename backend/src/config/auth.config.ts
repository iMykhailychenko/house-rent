export const authConfig = {
    accessKey: process.env.AUTH_SECRET_KEY || 'house_rent_dev',
    saltRounds: +process.env.AUTH_SALT_ROUNDS || 5,
    emailServiceHost: (process.env.EMAIL_APP_IMAGE_HOST || 'http://house-rent.com') + '/email',
    emailSecret: process.env.EMAIL_SECRET_KEY || 'house_rent_dev_email',
    resetPasswordSecret: process.env.RESET_PASSWORD_SECRET || 'house_rent_dev_password',
};
