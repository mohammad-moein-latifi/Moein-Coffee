const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User', // اگر کاربر ثبت‌نامی باشه
      required: false,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'ایمیل معتبر نیست',
      ],
    },
    body: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    score: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    productID: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment = mongoose.models.Comment || mongoose.model('Comment', schema);

export default Comment;
