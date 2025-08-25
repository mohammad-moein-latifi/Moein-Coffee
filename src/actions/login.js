'use server';

import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { generateAccessToken, verifyPassword } from '@/utils/auth';

export const loginAction = async (formData) => {
  try {
    connectToDB();

    const email = formData.get('email');
    const password = formData.get('password');

    const user = await UserModel.findOne({ email });
    if (!user) {
      return console.error('❌ User not found');
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );
    if (!isCorrectPasswordWithHash) {
      return console.error('❌ Email or password is not correct');
    }

    const accessToken = generateAccessToken({ email });

    console.log('✅ User logged in successfully:', user.email);
    return { user, accessToken };
  } catch (err) {
    return Response.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
};
