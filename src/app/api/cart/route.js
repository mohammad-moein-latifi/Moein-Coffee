import CartModel from '@/models/Cart';
import connectToDB from '@/configs/db';
import ProductModel from '@/models/Product';
import { authUser } from '@/utils/serverHelpers';

async function recalcAndPopulate(cart) {
  await cart.populate('items.product');

  cart.items = (cart.items || []).filter(Boolean);

  if (!cart.items || cart.items.length === 0) {
    await CartModel.findByIdAndDelete(cart._id);
    return { deleted: true, cart: null };
  }

  cart.totalPrice = cart.items.reduce((sum, item) => {
    const product = item.product;
    const price = product?.price ?? item.price ?? 0; // قیمت اصلی
    return sum + price * (item.quantity || 0);
  }, 0);

  cart.totalDiscount = cart.items.reduce((sum, item) => {
    const product = item.product;
    const price = product?.price ?? item.price ?? 0;
    const finalPrice = product?.finalPrice ?? price;
    return sum + Math.max(price - finalPrice, 0) * (item.quantity || 0);
  }, 0);

  cart.finalPrice = cart.items.reduce((sum, item) => {
    const product = item.product;
    const finalPrice = product?.finalPrice ?? product?.price ?? item.price ?? 0;
    return sum + finalPrice * (item.quantity || 0);
  }, 0);

  await cart.save();
  await cart.populate('items.product');
  return { deleted: false, cart };
}

async function enrichItemFromProduct(productId, qty = 1) {
  const prod = await ProductModel.findById(productId).select(
    'price discountPrice finalPrice discount'
  );
  if (!prod) throw new Error('Product not found');
  const effectivePrice =
    prod.discountPrice ?? prod.finalPrice ?? prod.price ?? 0;
  const discountValue =
    typeof prod.discount === 'number'
      ? prod.discount
      : Math.max((prod.price ?? 0) - effectivePrice, 0);
  return {
    product: prod._id,
    quantity: Math.max(Number(qty) || 1, 1),
    price: effectivePrice,
    discount: discountValue,
  };
}

export async function GET(req) {
  try {
    await connectToDB();
    const user = await authUser();
    const guestId = !user ? req.headers.get('x-guest-id') || null : null;

    let cart;
    if (user)
      cart = await CartModel.findOne({ user: user._id }).populate(
        'items.product'
      );
    else if (guestId)
      cart = await CartModel.findOne({ guestId }).populate('items.product');

    if (!cart)
      cart = { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };

    return Response.json({ cart, deleted: false }, { status: 200 });
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
    const { productId, quantity } = await req.json();

    const user = await authUser();
    const guestId = !user ? req.headers.get('x-guest-id') || null : null;
    if (!user && !guestId)
      return Response.json({ message: 'Guest ID missing' }, { status: 422 });

    let cart;
    if (user) {
      cart = await CartModel.findOne({ user: user._id });
      if (!cart) cart = await CartModel.create({ user: user._id, items: [] });
    } else {
      cart = await CartModel.findOne({ guestId });
      if (!cart) cart = await CartModel.create({ guestId, items: [] });
    }

    const prod = await ProductModel.findById(productId).select(
      'price discountPrice finalPrice discount'
    );
    if (!prod)
      return Response.json({ message: 'Product not found' }, { status: 404 });

    const effectivePrice =
      prod.discountPrice ?? prod.finalPrice ?? prod.price ?? 0;
    const discountValue =
      typeof prod.discount === 'number'
        ? prod.discount
        : Math.max((prod.price ?? 0) - effectivePrice, 0);

    const existingItem = cart.items.find(
      (i) => i.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      if (existingItem.price == null) existingItem.price = effectivePrice;
      if (existingItem.discount == null) existingItem.discount = discountValue;
    } else {
      cart.items.push({
        product: prod._id,
        quantity: quantity || 1,
        price: effectivePrice,
        discount: discountValue,
      });
    }

    const result = await recalcAndPopulate(cart);

    if (result.deleted) {
      return Response.json(
        {
          cart: { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 },
          deleted: true,
        },
        { status: 200 }
      );
    }

    return Response.json(
      { cart: result.cart, deleted: false },
      { status: 200 }
    );
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
    const { items } = await req.json();

    const user = await authUser();
    const guestId = !user ? req.headers.get('x-guest-id') || null : null;
    if (!user && !guestId)
      return Response.json({ message: 'Unauthorized' }, { status: 401 });

    const enriched = [];
    if (Array.isArray(items)) {
      for (const it of items) {
        try {
          const pid = it.product?._id ?? it.product;
          const qty = it.quantity ?? 1;
          const e = await enrichItemFromProduct(pid, qty);
          enriched.push(e);
        } catch (e) {}
      }
    }

    let cart;
    if (user) {
      cart = await CartModel.findOne({ user: user._id });
      if (!cart)
        cart = await CartModel.create({ user: user._id, items: enriched });
      else cart.items = enriched;
    } else {
      cart = await CartModel.findOne({ guestId });
      if (!cart) cart = await CartModel.create({ guestId, items: enriched });
      else cart.items = enriched;
    }

    const result = await recalcAndPopulate(cart);

    if (result.deleted) {
      return Response.json(
        {
          cart: { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 },
          deleted: true,
        },
        { status: 200 }
      );
    }

    return Response.json(
      { cart: result.cart, deleted: false },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const { productId } = await req.json();

    const user = await authUser();
    const guestId = !user ? req.headers.get('x-guest-id') || null : null;
    if (!user && !guestId)
      return Response.json({ message: 'Unauthorized' }, { status: 401 });

    let cart;
    if (user) cart = await CartModel.findOne({ user: user._id });
    else cart = await CartModel.findOne({ guestId });

    if (!cart)
      return Response.json(
        {
          cart: { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 },
          deleted: false,
        },
        { status: 200 }
      );

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    const result = await recalcAndPopulate(cart);

    if (result.deleted) {
      return Response.json(
        {
          cart: { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 },
          deleted: true,
        },
        { status: 200 }
      );
    }

    return Response.json(
      { cart: result.cart, deleted: false },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 }
    );
  }
}
