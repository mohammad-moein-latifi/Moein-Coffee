
import {
  validateEmail,
  validateUsername,
  validateName,
  validatePhone,
  validatePassword,
  stringRequired,
} from '@/utils/validators';

const rules = {
  firstName: [
    { fn: (v) => stringRequired(v), msg: 'نام الزامی است' },
    { fn: (v) => validateName(v), msg: 'نباید بیشتر از ۵۰ کاراکتر باشد' },
  ],
  lastName: [
    { fn: (v) => stringRequired(v), msg: 'نام خانوادگی الزامی است' },
    { fn: (v) => validateName(v), msg: 'نباید بیشتر از ۵۰ کاراکتر باشد' },
  ],
  username: [
    { fn: (v) => stringRequired(v), msg: 'نام کاربری الزامی است' },
    {
      fn: (v) => validateUsername(v),
      msg: 'باید بین ۳-۳۰ حرف،  و با حرف شروع شود)',
    },
  ],
  email: [
    { fn: (v) => stringRequired(v), msg: 'ایمیل الزامی است' },
    { fn: (v) => validateEmail(v), msg: 'ایمیل نامعتبر است' },
  ],
  phone: [
    {
      fn: (v) => !v || validatePhone(v),
      msg: 'شماره موبایل نامعتبر (مثال: 09123456789)',
    },
  ],
  password: [
    { fn: (v) => stringRequired(v), msg: 'رمز عبور الزامی است' },
    {
      fn: (v) => validatePassword(v),
      msg: 'باید حداقل ۸ کاراکتر شامل حرف بزرگ، کوچک، عدد و نماد باشد',
    },
  ],
  loginEmail: [
    { fn: (v) => stringRequired(v), msg: 'ایمیل الزامی است' },
    { fn: (v) => validateEmail(v), msg: 'ایمیل نامعتبر است' },
  ],
  loginPassword: [
    { fn: (v) => stringRequired(v), msg: 'رمز عبور الزامی است' },
    {
      fn: (v) => v && v.length >= 8,
      msg: 'رمز عبور باید حداقل ۸ کاراکتر باشد',
    },
  ],
};

export function validateField(field, val) {
  const rs = rules[field];
  if (!rs) return '';
  for (const r of rs) {
    try {
      if (!r.fn(val)) return r.msg;
    } catch (e) {
      return r.msg;
    }
  }
  return '';
}

export function validateAll(obj = {}) {
  const errors = {};
  for (const k of Object.keys(obj)) {
    const e = validateField(k, obj[k]);
    if (e) errors[k] = e;
  }
  return errors;
}

export function isValid(obj = {}) {
  return Object.keys(validateAll(obj)).length === 0;
}

export default validateField;
