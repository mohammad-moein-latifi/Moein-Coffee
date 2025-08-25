import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, verifyPassword } from "@/utils/auth";
import { validateEmail, validatePassword } from "@/utils/validators";

export async function POST(req) {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    // Validation
    if (!validateEmail(email) || !validatePassword(password)) {
      return Response.json(
        { message: "Invalid email or password format" },
        { status: 422 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const isCorrectPassword = await verifyPassword(password, user.password);
    if (!isCorrectPassword) {
      return Response.json(
        { message: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ email });

    return Response.json(
      { message: "User logged in successfully" },
      {
        status: 200,
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
