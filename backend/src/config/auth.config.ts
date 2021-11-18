export const authConfig = {
    accessKey: process.env.AUTH_SECRET_KEY || 'house_rent_dev',
    saltRounds: +process.env.AUTH_SALT_ROUNDS || 5,
    emailServiceHost: (process.env.BASE_URL || 'http://house-rent.com') + '/email',
    emailSecret: process.env.EMAIL_SECRET_KEY || 'house_rent_dev_email',
};
