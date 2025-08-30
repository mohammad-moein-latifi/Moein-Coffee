import React from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';

export default function About() {
  return (
    <div>
      <Link href="/" className="group inline-flex">
        <Icon
          name="appLogo"
          className="w-16 h-16 group-hover:text-amber-700 transition-all delay-75"
        />
        <Icon
          name="logoType"
          className="w-[138px] h-[54px] group-hover:text-amber-700 transition-all delay-75"
        />
      </Link>
      <p className="leading-8 text-sm md:text-base lg:text-lg xl:max-w-[500px] mt-6 md:mt-[18px]">
        در معین کافی باور داریم که قهوه تنها یک نوشیدنی نیست؛ قهوه پلی است برای
        دوستی، آرامش و خلق لحظه‌های ناب. می‌خواهیم با انتخاب بهترین دانه‌ها،
        فرآوری تخصصی، و خدمات صمیمی، همراه همیشگی شما در دنیای قهوه باشیم. آرزوی
        ما این است که طعم قهوه ایرانی، با کیفیتی جهانی، در دل مردم منطقه جا
        بگیرد.
      </p>
    </div>
  );
}
