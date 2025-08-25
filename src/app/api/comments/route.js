import connectToDB from '@/configs/db';
import CommentModel from '@/models/Comment';
import ProductModel from '@/models/Product';
import { stringRequired, validateEmail, numberRange } from '@/utils/validators';

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { username, body: commentBody, email, score, productID } = body;

    // Validation
    if (!stringRequired(username) || username.length > 50) {
      return Response.json(
        { message: 'Invalid username (max 50 chars)' },
        { status: 422 }
      );
    }
    if (!stringRequired(commentBody) || commentBody.length < 5) {
      return Response.json(
        { message: 'Comment body must be at least 5 characters' },
        { status: 422 }
      );
    }
    if (!validateEmail(email)) {
      return Response.json({ message: 'Invalid email' }, { status: 422 });
    }
    if (!numberRange(score, 1, 5)) {
      return Response.json(
        { message: 'Score must be between 1 and 5' },
        { status: 422 }
      );
    }
    if (!productID) {
      return Response.json(
        { message: 'productID is required' },
        { status: 422 }
      );
    }

    const comment = await CommentModel.create({
      username,
      body: commentBody,
      email,
      score,
      productID,
    });

    await ProductModel.findOneAndUpdate(
      { _id: productID },
      { $push: { comments: comment._id } }
    );

    return Response.json(
      { message: 'Comment created successfully :))', data: comment },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err.message || err }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const comments = await CommentModel.find({}, '-__v');
    return Response.json(comments, { status: 200 });
  } catch (err) {
    return Response.json({ message: err.message || err }, { status: 500 });
  }
}
