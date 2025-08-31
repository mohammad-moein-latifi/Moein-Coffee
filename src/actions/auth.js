'use server';

import UserModel from '@/models/User';
import CartModel from '@/models/Cart';
import connectToDB from '@/configs/db';
import { roles } from '@/constants/auth';
import {
  generateAccessToken,
  verifyPassword,
  hashPassword,
} from '@/utils/auth';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
  validatePhone,
} from '@/utils/validators';

const getValue = (formData, key) =>
  (formData.get(key) || '').toString().trim() || null;

const mergeGuestCart = async (guestId, userId) => {
  if (!guestId) return;

  const guestCart = await CartModel.findOne({ guestId }).lean();
  if (
    !guestCart ||
    !Array.isArray(guestCart.items) ||
    guestCart.items.length === 0
  )
    return;

  let userCart = await CartModel.findOne({ user: userId });

  if (!userCart) {
    const items = guestCart.items.map((it) => ({
      product: it.product,
      quantity: Number(it.quantity) || 1,
      price: it.price ?? undefined,
      discount: it.discount ?? undefined,
    }));
    await CartModel.create({ user: userId, items });
  } else {
    const idxMap = new Map();
    userCart.items.forEach((it, idx) => {
      if (it?.product) idxMap.set(it.product.toString(), idx);
    });

    for (const gItem of guestCart.items) {
      const pid = gItem.product?.toString?.();
      if (!pid) continue;
      if (idxMap.has(pid)) {
        const idx = idxMap.get(pid);
        userCart.items[idx].quantity =
          (userCart.items[idx].quantity || 0) + (Number(gItem.quantity) || 0);

        if (userCart.items[idx].price == null && gItem.price != null)
          userCart.items[idx].price = gItem.price;
        if (userCart.items[idx].discount == null && gItem.discount != null)
          userCart.items[idx].discount = gItem.discount;
      } else {
        userCart.items.push({
          product: gItem.product,
          quantity: Number(gItem.quantity) || 1,
          price: gItem.price ?? undefined,
          discount: gItem.discount ?? undefined,
        });
      }
    }

    await userCart.save();
  }

  await CartModel.deleteOne({ guestId });
};

export const loginAction = async (formData, guestId = null) => {
  try {
    await connectToDB();

    const email = getValue(formData, 'email');
    const password = getValue(formData, 'password');

    if (!email || !password)
      return { error: 'Email and password are required' };
    if (!validateEmail(email) || !validatePassword(password)) {
      return { error: 'Invalid email or password format' };
    }

    const user = await UserModel.findOne({ email }).lean();
    if (!user) return { error: 'User not found' };

    const hashed = user.password;
    if (!hashed) return { error: 'User has no password set' };

    const isCorrect = await verifyPassword(password, hashed);
    if (!isCorrect) return { error: 'Email or password is incorrect' };

    await mergeGuestCart(guestId, user._id);

    const safeUser = await UserModel.findById(user._id, '-password').lean();

    const accessToken = generateAccessToken({ email: safeUser.email });

    return { user: safeUser, accessToken };
  } catch (err) {
    return { error: err?.message || 'Internal server error' };
  }
};

export const signupAction = async (formData, guestId = null) => {
  try {
    await connectToDB();

    const firstName = getValue(formData, 'firstName');
    const lastName = getValue(formData, 'lastName');
    const username = getValue(formData, 'username');
    const phone = getValue(formData, 'phone');
    const email = getValue(formData, 'email');
    const password = getValue(formData, 'password');

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateUsername(username) ||
      !validateEmail(email) ||
      !validatePhone(phone) ||
      !validatePassword(password)
    ) {
      return { error: 'Invalid user data' };
    }

    const [existingUser, usersCount] = await Promise.all([
      UserModel.findOne({ $or: [{ username }, { email }, { phone }] }).lean(),
      UserModel.estimatedDocumentCount(),
    ]);

    if (existingUser)
      return { error: 'Username, email, or phone already exists' };

    const hashedPassword = await hashPassword(password);

    const role = usersCount > 0 ? roles.USER : roles.ADMIN;

    const newUser = await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await mergeGuestCart(guestId, newUser._id);

    const safeUser = await UserModel.findById(newUser._id, '-password').lean();
    const accessToken = generateAccessToken({ email: safeUser.email });

    return { user: safeUser, accessToken };
  } catch (err) {
    if (err?.code === 11000) {
      const dupField = Object.keys(err.keyValue || {}).join(', ') || 'field';
      return { error: `Duplicate value for ${dupField}` };
    }
    return { error: err?.message || 'Internal server error' };
  }
};
