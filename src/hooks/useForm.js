import { useState } from 'react';
import validateField from '@/utils/fieldValidator';

export default function useForm(initialFields = {}, validationKeyMap = {}) {
  const [fields, setFields] = useState(initialFields);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState('');

  const vk = (name) => validationKeyMap[name] || name;

  const setField = (name, value) =>
    setFields((p) => ({ ...p, [name]: value }));

  const setFieldsAll = (next) => setFields((p) => ({ ...p, ...next }));

  const handleBlur = (name, markTouched = true) => {
    if (markTouched) setTouched((p) => ({ ...p, [name]: true }));
    const err = validateField(vk(name), fields[name]);
    setErrors((p) => ({ ...p, [name]: err || undefined }));
    return err;
  };

  const validateAll = () => {
    const newErrors = {};
    for (const k of Object.keys(fields)) {
      const e = validateField(vk(k), fields[k]);
      if (e) newErrors[k] = e;
    }
    setErrors(newErrors);
    return newErrors;
  };

  const setAllTouched = () =>
    setTouched(Object.keys(fields).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

  const reset = (next = {}) => {
    setFields(next && Object.keys(next).length ? next : initialFields);
    setTouched({});
    setErrors({});
    setServerMsg('');
  };

  return {
    fields,
    setField,
    setFields: setFieldsAll,
    touched,
    setTouched,
    errors,
    setErrors,
    serverMsg,
    setServerMsg,
    handleBlur,
    validateAll,
    setAllTouched,
    reset,
  };
}
