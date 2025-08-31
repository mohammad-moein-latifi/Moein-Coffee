import UserModel from '@/models/User';
import connectToDB from '@/configs/db';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/utils/auth';

export async function GET() {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return Response.json(
        { data: null, message: 'Access token not provided' },
        { status: 401 }
      );
    }

    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return Response.json(
        { data: null, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne(
      { email: tokenPayload.email },
      '-password'
    );

    if (!user) {
      return Response.json(
        { data: null, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({ data: user }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}
