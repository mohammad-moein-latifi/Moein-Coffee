import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateName,
  validatePhone,
} from "@/utils/validators";

export async function POST(req) {
  try {
    await connectToDB();
    const {
      firstName,
      lastName,
      username,
      phone,
      email,
      password,
    } = await req.json();

    // Validation
    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateUsername(username) ||
      !validateEmail(email) ||
      !validatePhone(phone) ||
      !validatePassword(password)
    ) {
      return Response.json(
        { message: "Invalid user data" },
        { status: 422 }
      );
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });

    if (isUserExist) {
      return Response.json(
        { message: "Username, email, or phone already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const accessToken = generateAccessToken({ email });

    const usersCount = await UserModel.countDocuments();

    await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password: hashedPassword,
      role: usersCount > 0 ? roles.USER : roles.ADMIN,
    });

    return Response.json(
      { message: "User signed up successfully" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (err) {
    return Response.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
