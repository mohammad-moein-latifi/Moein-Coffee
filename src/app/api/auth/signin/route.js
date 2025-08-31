import UserModel from '@/models/User';
import connectToDB from '@/configs/db';
import { verifyPassword, generateAccessToken } from '@/utils/auth';
import { mergeGuestCartWithUser } from '@/libs/cart/mergeGuestCart';
import { validateEmail, validatePassword } from '@/utils/validators';

export async function POST(req) {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    if (!validateEmail(email) || !validatePassword(password)) {
      return Response.json(
        { message: 'Invalid email or password format' },
        { status: 422 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user)
      return Response.json({ message: 'User not found' }, { status: 404 });

    const isCorrectPassword = await verifyPassword(password, user.password);
    if (!isCorrectPassword)
      return Response.json(
        { message: 'Email or password incorrect' },
        { status: 401 }
      );

    const accessToken = generateAccessToken({ email });

    const guestId = req.headers.get('x-guest-id') || null;
    if (guestId) await mergeGuestCartWithUser(user._id, guestId);

    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';

    return Response.json(
      { message: 'User logged in successfully' },
      {
        status: 200,
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
