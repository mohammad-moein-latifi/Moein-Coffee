import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    totalDiscount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default CartModel;
