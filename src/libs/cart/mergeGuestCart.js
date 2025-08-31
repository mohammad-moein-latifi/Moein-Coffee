import connectToDB from '@/configs/db';
import CartModel from '@/models/Cart';
import ProductModel from '@/models/Product';
import { recalcCartTotals } from '@/app/api/utils/cartHelpers';

export async function mergeGuestCartWithUser(userId, guestId) {
  if (!userId || !guestId) return;
  await connectToDB();

  const guestCart = await CartModel.findOne({ guestId });
  if (!guestCart) return;

  let userCart = await CartModel.findOne({ user: userId });
  if (!userCart) {
    guestCart.user = userId;
    guestCart.guestId = null;
    await guestCart.save();

    await recalcCartTotals(guestCart);
    return;
  }

  for (const gItem of guestCart.items) {
    const pid =
      typeof gItem.product === 'string'
        ? gItem.product
        : gItem.product?._id || gItem.product;
    if (!pid) continue;

    const prod = await ProductModel.findById(pid).select(
      'price discountPrice finalPrice discount'
    );
    if (!prod) continue;

    const effectivePrice =
      prod.discountPrice ?? prod.finalPrice ?? prod.price ?? 0;
    const discountValue =
      typeof prod.discount === 'number'
        ? prod.discount
        : Math.max((prod.price ?? 0) - effectivePrice, 0);

    const idx = userCart.items.findIndex((it) => it.product.toString() === pid);
    if (idx > -1) {
      userCart.items[idx].quantity += Math.max(Number(gItem.quantity) || 1, 1);
      if (userCart.items[idx].price == null)
        userCart.items[idx].price = effectivePrice;
      if (userCart.items[idx].discount == null)
        userCart.items[idx].discount = discountValue;
    } else {
      userCart.items.push({
        product: prod._id,
        quantity: Math.max(Number(gItem.quantity) || 1, 1),
        price: effectivePrice,
        discount: discountValue,
      });
    }
  }

  await userCart.save();
  await recalcCartTotals(userCart);

  await guestCart.deleteOne();
}
