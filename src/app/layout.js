import Providers from './providers';
import ClientOnly from '@/components/common/ClientOnly';

import './globals.css';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Moein Coffee | خرید قهوه تازه و باکیفیت',
  description:
    'معین کافی | فروش آنلاین قهوه تازه، دانه و پودر قهوه باکیفیت. ارسال سریع، تنوع بالا و طعمی فراموش‌نشدنی برای دوستداران قهوه.',
  keywords: [
    'خرید قهوه',
    'قهوه تازه',
    'فروش قهوه',
    'دانه قهوه',
    'پودر قهوه',
    'معین کافی',
  ],
  authors: [{ name: 'Moein Coffee' }],
  icons: {
    icon: '/img/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir bg-gray-100 dark:bg-zinc-800 overflow-x-hidden">
        <Providers>
          <ClientOnly>{children}</ClientOnly>
        </Providers>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={false}
          rtl
          pauseOnHover
          pauseOnFocusLoss={false}
          newestOnTop
          toastClassName="toast-root max-w-sm w-full flex items-start gap-3 rounded-xl shadow-lg border px-4 py-3 bg-stone-900/80 text-stone-100"
          bodyClassName="font-vazir-md text-sm leading-tight"
          progressClassName="bg-amber-400"
          closeButton={false}
        />
      </body>
    </html>
  );
}
