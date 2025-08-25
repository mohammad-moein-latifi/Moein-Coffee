import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
