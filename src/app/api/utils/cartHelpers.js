export async function recalcCartTotals(cartDoc) {
  await cartDoc.populate('items.product');

  let totalPrice = 0;
  let totalDiscount = 0;

  for (const item of cartDoc.items || []) {
    const p = item.product;
    if (!p) continue;

    const quantity = item.quantity || 0;

    const basePrice = p.price ?? item.price ?? 0;

    const finalPrice =
      p.finalPrice ?? p.discountPrice ?? item.price ?? basePrice;

    totalPrice += finalPrice * quantity;

    totalDiscount += Math.max(basePrice - finalPrice, 0) * quantity;
  }

  cartDoc.totalPrice = totalPrice;
  cartDoc.totalDiscount = totalDiscount;
  cartDoc.finalPrice = totalPrice;
  await cartDoc.save();
}
