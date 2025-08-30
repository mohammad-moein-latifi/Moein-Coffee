import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import {
  validateEmail,
  validatePhone,
  validatePassword,
} from './validators.js';

export const hashPassword = async (password) => {
  try {
    if (!validatePassword(password)) {
      throw new Error('❌ Password does not meet security requirements.');
    }

    const hashedPassword = await hash(password, 12);

    return hashedPassword;
  } catch (err) {
    throw err;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const isValid = await compare(password, hashedPassword);

    return isValid;
  } catch (err) {
    throw err;
  }
};

export const generateAccessToken = (data) => {
  try {
    const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
      expiresIn: '15m',
    });

    return token;
  } catch (err) {
    throw err;
  }
};

export const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);

    return tokenPayload;
  } catch (err) {
    return null;
  }
};

export const validateUserEmail = (email) => validateEmail(email);
export const validateUserPhone = (phone) => validatePhone(phone);
export const validateUserPassword = (password) => validatePassword(password);
