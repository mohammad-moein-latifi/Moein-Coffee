import connectToDB from '@/configs/db';
import ArticleModel from '@/models/Article';
import { stringRequired, stringMaxLength } from '@/utils/validators';

export async function GET() {
  try {
    await connectToDB();
    const articles = await ArticleModel.find({}, '-__v');
    return Response.json(articles, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { img, title, author, summary, body: content } = body;

    // Validation
    if (!stringRequired(title) || !stringMaxLength(title, 200)) {
      return Response.json(
        { message: 'Title is required and max 200 chars' },
        { status: 422 }
      );
    }
    if (!stringRequired(author) || !stringMaxLength(author, 100)) {
      return Response.json(
        { message: 'Author is required and max 100 chars' },
        { status: 422 }
      );
    }
    if (!stringRequired(summary) || !stringMaxLength(summary, 500)) {
      return Response.json(
        { message: 'Summary is required and max 500 chars' },
        { status: 422 }
      );
    }
    if (!stringRequired(content)) {
      return Response.json(
        { message: 'Body content is required' },
        { status: 422 }
      );
    }
    if (!stringRequired(img)) {
      return Response.json({ message: 'Image is required' }, { status: 422 });
    }

    const article = await ArticleModel.create({
      img,
      title,
      author,
      summary,
      body: content,
    });
    return Response.json(
      { message: 'Article created successfully', data: article },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}
