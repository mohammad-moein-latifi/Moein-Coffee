import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, 12);
    console.log('✅ Password hashed successfully.');
    return hashedPassword;
  } catch (err) {
    console.error('❌ Failed to hash password:', err);
    throw err;
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    const isValid = await compare(password, hashedPassword);
    console.log('✅ Password verification completed.');
    return isValid;
  } catch (err) {
    console.error('❌ Failed to verify password:', err);
    throw err;
  }
};

const generateAccessToken = (data) => {
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

const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    console.log('✅ Access token verified.');
    return tokenPayload;
  } catch (err) {
    console.error('❌ Invalid or expired access token:', err);
    return null;
  }
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePhone = (phone) => {
  const phonePattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phonePattern.test(phone);
};

const validatePassword = (password) => {
  const passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  return passwordPattern.test(password);
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  validateEmail,
  validatePhone,
  validatePassword,
};
