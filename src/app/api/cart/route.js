import connectToDB from '@/configs/db';
import CartModel from '@/models/Cart';
import ProductModel from '@/models/Product';
import { authUser } from '@/utils/serverHelpers';
import mongoose from 'mongoose';

function calculateCart(cart) {
  const totalPrice = cart.items.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );
  const totalDiscount = cart.items.reduce(
    (sum, it) =>
      sum +
      (it.discountPrice ? (it.price - it.discountPrice) * it.quantity : 0),
    0
  );
  const finalPrice = totalPrice - totalDiscount;

  return { totalPrice, totalDiscount, finalPrice };
}

export async function GET() {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cart = await CartModel.findOne({ user: user._id }).populate(
      'items.product'
    );

    if (!cart) {
      return Response.json({
        cart: { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 },
      });
    }

    const totals = calculateCart(cart);
    return Response.json({ cart: { ...cart.toObject(), ...totals } });
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
    const user = await authUser();
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity = 1 } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(productId) || quantity < 1) {
      return Response.json(
        { message: 'Invalid product ID or quantity' },
        { status: 422 }
      );
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }

    let cart = await CartModel.findOne({ user: user._id });
    if (!cart) cart = await CartModel.create({ user: user._id, items: [] });

    const idx = cart.items.findIndex(
      (it) => it.product.toString() === productId
    );
    if (idx > -1) {
      cart.items[idx].quantity += Number(quantity);
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        price: product.price,
        discountPrice: product.discountPrice ?? null,
      });
    }

    await cart.save();
    await cart.populate('items.product');

    const totals = calculateCart(cart);
    return Response.json({
      message: 'Item added to cart',
      cart: { ...cart.toObject(), ...totals },
    });
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await req.json();
    if (!Array.isArray(items)) {
      return Response.json(
        { message: 'Invalid items format' },
        { status: 422 }
      );
    }

    let cart = await CartModel.findOne({ user: user._id });
    if (!cart) cart = await CartModel.create({ user: user._id, items: [] });

    cart.items = await Promise.all(
      items.map(async (it) => {
        if (!mongoose.Types.ObjectId.isValid(it.product) || it.quantity < 1) {
          throw new Error('Invalid product ID or quantity');
        }
        const p = await ProductModel.findById(it.product);
        if (!p) throw new Error('Product not found');
        return {
          product: p._id,
          quantity: it.quantity || 1,
          price: p.price,
          discountPrice: p.discountPrice ?? null,
        };
      })
    );

    await cart.save();
    await cart.populate('items.product');

    const totals = calculateCart(cart);
    return Response.json({
      message: 'Cart updated successfully',
      cart: { ...cart.toObject(), ...totals },
    });
  } catch (err) {
    return Response.json(
      { message: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return Response.json(
        { message: 'Product ID is required' },
        { status: 422 }
      );
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }

    let cart = await CartModel.findOne({ user: user._id });
    if (!cart) {
      return Response.json({ message: 'Cart not found' }, { status: 404 });
    }

    cart.items = cart.items.filter((it) => it.product.toString() !== productId);

    await cart.save();
    await cart.populate('items.product');

    return Response.json(
      { message: 'Product removed from cart', cart },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}
