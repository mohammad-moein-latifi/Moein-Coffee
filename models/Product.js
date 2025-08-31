const mongoose = require('mongoose');
require('./Comment');

const schema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    longDescription: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    smell: {
      type: Number,
      default: 5,
      min: 1,
      max: 10,
    },

    score: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

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

    isSpecial: {
      type: Boolean,
      default: false,
    },

    isNew: {
      type: Boolean,
      default: false,
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],

    notes: {
      type: [String],
      required: true,
    },

    combinations: [
      {
        percentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },

        type: {
          type: String,
          required: true,
          trim: true,
        },

        origins: [
          {
            type: String,
            required: true,
            trim: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', schema);

module.exports = Product;
