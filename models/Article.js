const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const model = mongoose.models.Article || mongoose.model('Article', schema);

export default model;
