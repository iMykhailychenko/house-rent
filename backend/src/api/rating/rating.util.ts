export const parseNumber = (value?: string): number => Math.round(parseFloat(value || '0') * 10) / 10;
