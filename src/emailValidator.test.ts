import { isValidEmail } from './emailValidator';

describe('emailValidator', () => {
    test('Should return true for valid email address', () => {
        expect(isValidEmail('a@example.com')).toBe(true);
    });

    test('Should return false for invalid email', () => {
        expect(isValidEmail('apple')).toBe(false);
    });

    test('Should return true for valid email address with ip domain', () => {
        expect(isValidEmail('a@[123.123.123.123]')).toBe(true);
    });

    test('Should return false for email address with invalid ip domain', () => {
        expect(isValidEmail('a@[256.123.123.123]')).toBe(false);
    });
});
