const mongoose = require('mongoose');
require('./Comment');

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    weight: { type: Number, required: true, min: 0 },
    suitableFor: { type: String, required: true, trim: true },
    smell: { type: String, required: true, trim: true },
    score: { type: Number, default: 5, min: 0, max: 5 },
    tags: { type: [String], required: true },

    img: { type: String, required: true, trim: true },

    isNew: { type: Boolean, default: false },
    isSpecial: { type: Boolean, default: false },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    finalPrice: {
      type: Number,
      default: function () {
        return this.discount > 0
          ? this.price - (this.price * this.discount) / 100
          : this.price;
      },
    },

    stock: { type: Number, default: 0, min: 0 },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', schema);

module.exports = Product;
