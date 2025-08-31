const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'نام الزامی است'],
      trim: true,
      maxlength: [50, 'نام نباید بیشتر از ۵۰ کاراکتر باشد'],
    },
    lastName: {
      type: String,
      required: [true, 'نام خانوادگی الزامی است'],
      trim: true,
      maxlength: [50, 'نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد'],
    },
    username: {
      type: String,
      required: [true, 'نام کاربری الزامی است'],
      unique: true,
      index: true,
      trim: true,
      minlength: [3, 'نام کاربری حداقل باید ۳ کاراکتر باشد'],
      maxlength: [30, 'نام کاربری حداکثر باید ۳۰ کاراکتر باشد'],
      match: [
        /^[a-zA-Z][a-zA-Z0-9_.-]*$/,
        'نام کاربری باید با حرف شروع شود و فقط شامل حروف، اعداد، نقطه، خط تیره و underscore باشد',
      ],
    },
    email: {
      type: String,
      required: [true, 'ایمیل الزامی است'],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'ایمیل وارد شده معتبر نیست',
      ],
    },
    phone: {
      type: String,
      sparse: true,
      match: [
        /^(\+98|0)?9\d{9}$/,
        'شماره موبایل معتبر نیست (نمونه: 09123456789 یا +989123456789)',
      ],
    },
    password: {
      type: String,
      required: [true, 'رمز عبور الزامی است'],
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
