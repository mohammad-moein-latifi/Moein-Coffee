import { cookies } from 'next/headers';
import UserModel from '@/models/User';
import connectToDB from '@/configs/db';
import { verifyAccessToken } from './auth';

const authUser = async () => {
  await connectToDB();
  const token = cookies().get('token');
  if (!token) return null;

  const tokenPayload = verifyAccessToken(token.value);
  if (!tokenPayload) {
    console.error('❌ Invalid access token.');
    return null;
  }

  const user = await UserModel.findOne({ email: tokenPayload.email });
  if (!user) {
    console.error('❌ User not found.');
    return null;
  }

  console.log('✅ Authenticated user:', user.email);
  return user;
};

const authAdmin = async () => {
  const user = await authUser();
  if (user && user.role === 'ADMIN') {
    console.log('✅ Admin authenticated:', user.email);
    return user;
  }

  console.error('❌ Access denied. Admin only.');
  return null;
};

export { authUser, authAdmin };
