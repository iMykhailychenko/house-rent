export const passwordValidate = (password?: string): string | null => {
    if (!password || password.length < 6 || password.length > 30) {
        return 'password must be longer than or equal to 6 and shorter than or equal to 30 characters';
    }
    return null;
};
