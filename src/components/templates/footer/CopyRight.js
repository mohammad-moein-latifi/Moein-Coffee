import React from 'react';

export default function CopyRight() {
  return (
    <div className="flex items-center justify-center text-center gap-4 font-vazir-md text-xs md:text-sm lg:text-base pt-10 md:pt-11 mt-10 md:mt-11 border-t border-white/10">
      <div className="flex flex-wrap justify-center items-center gap-x-2.5">
        <div className="w-[30px] h-[30px] rounded-full border border-white/10 flex-center shrink-0">
          <div className="w-5 h-5 rounded-full border border-white/20 flex-center">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-t from-amber-500/80 to-amber-600/80"></div>
          </div>
        </div>
        <p>
          تمامی حقوق مادی و معنوی این رابط کاربری متعلق به
          <span className="text-amber-700"> «محمّد معین لطیفی» </span>
          می‌باشد. هرگونه کپی‌برداری، بازتوزیع یا استفاده تجاری از محتوا و طراحی
          این پروژه بدون کسب اجازه کتبی صریح ممنوع است.
        </p>
        <p className="text-amber-700">۲۰۲۵ Moein Coffee ©</p>
      </div>
    </div>
  );
}
