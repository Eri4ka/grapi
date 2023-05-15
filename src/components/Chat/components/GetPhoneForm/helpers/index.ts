export const validatePhoneNumber = (phone: string): boolean => /^[7]\d{10}$/g.test(phone);
