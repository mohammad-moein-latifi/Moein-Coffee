import connectToDB from '@/configs/db';
import ProductModel from '@/models/Product';
import {
  stringRequired,
  numberMin,
  numberRange,
  arrayOfStrings,
} from '@/utils/validators';

export async function GET() {
  try {
    await connectToDB();
    const products = await ProductModel.find({}, '-__v').populate('comments');
    return Response.json(products, { status: 200 });
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
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      smell,
      notes,
      img,
      isNew = false,
      isSpecial = false,
      discount = 0,
      stock = 0,
      score = 5,
      combinations = [],
    } = body;

    // Validation
    if (
      !stringRequired(name) ||
      !stringRequired(shortDescription) ||
      !stringRequired(longDescription) ||
      !stringRequired(img)
    ) {
      return Response.json(
        { message: 'Required fields are missing or invalid' },
        { status: 422 }
      );
    }

    if (
      !numberMin(price, 0) ||
      !numberMin(weight, 0) ||
      !numberRange(discount, 0, 100) ||
      !numberMin(stock, 0) ||
      !numberRange(score, 1, 5) ||
      !numberRange(smell, 1, 10)
    ) {
      return Response.json(
        { message: 'Numeric fields are invalid' },
        { status: 422 }
      );
    }

    if (!arrayOfStrings(notes)) {
      return Response.json(
        { message: 'Notes must be arrays of strings' },
        { status: 422 }
      );
    }

    if (!Array.isArray(combinations)) {
      return Response.json(
        { message: 'Combinations must be an array' },
        { status: 422 }
      );
    }

    for (const c of combinations) {
      if (
        typeof c.percentage !== 'number' ||
        c.percentage < 0 ||
        c.percentage > 100 ||
        !stringRequired(c.type) ||
        !arrayOfStrings(c.origins)
      ) {
        return Response.json(
          { message: 'Invalid combination format' },
          { status: 422 }
        );
      }
    }

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      smell,
      notes,
      img,
      isNew,
      isSpecial,
      discount,
      stock,
      score,
      combinations,
    });

    return Response.json(
      { message: 'Product created successfully', data: product },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}
