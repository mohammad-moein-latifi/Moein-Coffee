import UserModel from '@/models/User';
import { cookies } from 'next/headers';
import connectToDB from '@/configs/db';
import { verifyAccessToken } from './auth';

const authUser = async () => {
  await connectToDB();

  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) return null;

  const tokenPayload = verifyAccessToken(token.value);
  if (!tokenPayload) {
    return null;
  }

  const user = await UserModel.findOne({ email: tokenPayload.email });
  if (!user) {
    return null;
  }

  return user;
};

const authAdmin = async () => {
  const user = await authUser();
  if (user && user.role === 'ADMIN') {
    return user;
  }

  return null;
};

export { authUser, authAdmin };
