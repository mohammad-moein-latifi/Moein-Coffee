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
    console.log('✅ Password hashed successfully.');
    return hashedPassword;
  } catch (err) {
    console.error('❌ Failed to hash password:', err);
    throw err;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const isValid = await compare(password, hashedPassword);
    console.log('✅ Password verification completed.');
    return isValid;
  } catch (err) {
    console.error('❌ Failed to verify password:', err);
    throw err;
  }
};

export const generateAccessToken = (data) => {
  try {
    const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
      expiresIn: '15m',
    });
    console.log('✅ Access token generated.');
    return token;
  } catch (err) {
    console.error('❌ Failed to generate access token:', err);
    throw err;
  }
};

export const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    console.log('✅ Access token verified.');
    return tokenPayload;
  } catch (err) {
    console.error('❌ Invalid or expired access token:', err);
    return null;
  }
};

export const validateUserEmail = (email) => validateEmail(email);
export const validateUserPhone = (phone) => validatePhone(phone);
export const validateUserPassword = (password) => validatePassword(password);
