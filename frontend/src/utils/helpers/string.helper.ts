export const cutString = (str: string, len: number): string => (str.length < len ? str : str.slice(0, len - 3) + '...');
