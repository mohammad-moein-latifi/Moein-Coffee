import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("token");
  return Response.json(
    { message: "User logged out successfully" },
    { status: 200 }
  );
}
