import UserModel from '@/models/User';
import connectToDB from '@/configs/db';
import { roles } from '@/constants/auth';
import { hashPassword, generateAccessToken } from '@/utils/auth';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
  validatePhone,
} from '@/utils/validators';
import { mergeGuestCartWithUser } from '@/libs/cart/mergeGuestCart';

export async function POST(req) {
  try {
    await connectToDB();
    const { firstName, lastName, username, phone, email, password } =
      await req.json();

    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateUsername(username) ||
      !validateEmail(email) ||
      !validatePhone(phone) ||
      !validatePassword(password)
    ) {
      return Response.json({ message: 'Invalid user data' }, { status: 422 });
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (isUserExist)
      return Response.json(
        { message: 'Username, email, or phone already exists' },
        { status: 409 }
      );

    const hashedPassword = await hashPassword(password);
    const usersCount = await UserModel.countDocuments();

    const newUser = await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password: hashedPassword,
      role: usersCount > 0 ? roles.USER : roles.ADMIN,
    });

    const accessToken = generateAccessToken({ email });

    const guestId = req.headers.get('x-guest-id') || null;
    if (guestId) await mergeGuestCartWithUser(newUser._id, guestId);

    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';

    return Response.json(
      { message: 'User signed up successfully' },
      {
        status: 201,
        headers: {
          'Set-Cookie': `token=${accessToken}; Path=/; HttpOnly; SameSite=Strict${secureFlag}`,
        },
      }
    );
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}
