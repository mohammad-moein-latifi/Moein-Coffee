// Email validation: standard email format
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Username: starts with a letter, 3-30 chars, allows letters, numbers, ., _, -
export const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.-]{2,29}$/;

// Name: any characters, max 50 characters
export const nameRegex = /^.{1,50}$/;

// Iranian phone number: optional +98 or 0, followed by 9 digits
export const phoneRegex = /^(\+98|0)?9\d{9}$/;

// Strong password: at least one uppercase, one lowercase, one number, one special char, min 8 chars
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const stringRequired = (str) =>
  typeof str === 'string' && str.trim() !== '';
export const stringMaxLength = (str, max) =>
  typeof str === 'string' && str.length <= max;

export const numberMin = (num, min) => typeof num === 'number' && num >= min;
export const numberRange = (num, min, max) =>
  typeof num === 'number' && num >= min && num <= max;

export const arrayOfStrings = (arr) =>
  Array.isArray(arr) && arr.every((el) => typeof el === 'string');

export const validateEmail = (email) => emailRegex.test(email);
export const validateUsername = (username) => usernameRegex.test(username);
export const validateName = (name) => nameRegex.test(name);
export const validatePhone = (phone) => (phone ? phoneRegex.test(phone) : true);
export const validatePassword = (password) => passwordRegex.test(password);
