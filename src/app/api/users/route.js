import connectToDB from '@/configs/db';
import UserModel from '@/models/User';
import { authUser } from '@/utils/serverHelpers';
import { validateName, validateEmail, validatePhone } from '@/utils/validators';

export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone } = body;

    // Validation
    if (!validateName(name)) {
      return Response.json(
        { message: 'Invalid name (max 50 characters)' },
        { status: 422 }
      );
    }
    if (!validateEmail(email)) {
      return Response.json({ message: 'Invalid email' }, { status: 422 });
    }
    if (phone && !validatePhone(phone)) {
      return Response.json(
        { message: 'Invalid phone number' },
        { status: 422 }
      );
    }

    const isExist = await UserModel.findOne({ email, _id: { $ne: user._id } });
    if (isExist) {
      return Response.json(
        { message: 'Email already in use' },
        { status: 422 }
      );
    }

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { firstName: name, email, phone } }
    );

    return Response.json(
      { message: 'User updated successfully :))' },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.message || err }, { status: 500 });
  }
}
