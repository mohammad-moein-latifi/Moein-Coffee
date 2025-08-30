'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useForm from '@/hooks/useForm';
import { useSignin, useSignup } from '@/hooks/useAuth';

import AuthCard from '@/components/templates/auth/AuthCard';
import LoginForm from '@/components/templates/auth/LoginForm';
import SignupForm from '@/components/templates/auth/SignupForm';

export default function AuthPage() {
  const router = useRouter();
  const signin = useSignin();
  const signup = useSignup();

  const [mode, setMode] = useState('login');
  const { serverMsg, setServerMsg } = useForm('');

  const loginForm = useForm(
    { email: '', password: '' },
    { email: 'loginEmail', password: 'loginPassword' }
  );

  const signupForm = useForm({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const submitForm = async (e) => {
    e.preventDefault();
    setServerMsg('');
    const errs =
      mode === 'login' ? loginForm.validateAll() : signupForm.validateAll();
    if (Object.keys(errs).length) return;
    try {
      if (mode === 'login') {
        await signin.mutateAsync({
          email: loginForm.fields.email.trim(),
          password: loginForm.fields.password,
        });
      } else {
        await signup.mutateAsync({
          firstName: signupForm.fields.firstName,
          lastName: signupForm.fields.lastName,
          username: signupForm.fields.username,
          phone: signupForm.fields.phone,
          email: signupForm.fields.email,
          password: signupForm.fields.password,
        });
      }

      toast.success('خوش آمدید ! در حال هدایت به صفحه اصلی . . .');

      setTimeout(() => router.push('/'), 700);
    } catch (err) {
      let message;
      switch (err.status) {
        case 401:
          message = 'ایمیل یا رمز عبور اشتباه است !';
          break;
        case 404:
          message = 'کاربری با این مشخصات پیدا نشد !';
          break;
        case 422:
          message = 'اطلاعات وارد شده صحیح نمی باشد !';
          break;
        case 409:
          message = 'نام کاربری ، ایمیل و یا شماره تلفن تکراری است !';
          break;
        default:
          message = 'خطای ناشناخته در سیستم !';
          break;
      }
      setServerMsg(message);
      toast.error(message);
    }
  };

  return (
    <>
      <main
        dir="rtl"
        className="bg-auth min-h-screen md:fixed md:inset-0 flex items-center justify-center px-4 py-6">
        <div
          className="w-full max-w-md mx-auto transform-gpu origin-center transition-all duration-700  
          'opacity-0 translate-y-6'
          ">
          <AuthCard
            title={mode === 'login' ? 'ورود به حساب' : 'ثبت‌نام'}
            mode={mode}
            setMode={setMode}>
            <div className="relative min-h-[320px]">
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  mode === 'login'
                    ? 'opacity-100 scale-100 blur-0 pointer-events-auto'
                    : 'opacity-0 scale-95 blur-sm pointer-events-none'
                }`}>
                <LoginForm
                  form={loginForm}
                  onSubmit={submitForm}
                  signin={signin}
                />
              </div>

              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  mode === 'signup'
                    ? 'opacity-100 scale-100 blur-0 pointer-events-auto block'
                    : 'opacity-0 scale-95 blur-sm pointer-events-none hidden'
                }`}>
                <SignupForm
                  form={signupForm}
                  onSubmit={submitForm}
                  signup={signup}
                />
              </div>
            </div>
          </AuthCard>
        </div>
      </main>
    </>
  );
}
