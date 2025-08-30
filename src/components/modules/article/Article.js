import Icon from '@/components/common/Icon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Article({
  id,
  img,
  title,
  author,
  publishedAt,
  summary,
}) {
  const publishedDate = new Date(publishedAt);

  return (
    <div className="group [perspective:1000px]">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] sm:sm:group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="group p-2.5 md:pb-2 bg-white dark:bg-stone-800 shadow-custom rounded-2xl flex sm:block gap-x-2.5">
          <div className="relative shrink-0 mb-2 sm:mb-5 w-[130px] sm:w-auto h-[130px] sm:h-47 rounded-2xl rounded-bl-4xl overflow-hidden">
            <Image
              className="h-full sm:h-auto object-cover"
              loading="lazy"
              src={img}
              alt="Blog 1"
              width={500}
              height={500}
            />
          </div>
          <div className="text-stone-800 dark:text-white font-vazir-md flex flex-col justify-between items-start lg:items-center w-full">
            <Link
              href={`blog/${id}`}
              className="mt-2.5 sm:mt-0 ml-1.5 sm:ml-0 text-sm md:text-base line-clamp-2 h-12">
              {title}
            </Link>
            <div className="flex justify-between items-end border-t border-stone-200 dark:border-white/10 pt-[18px] mt-3 mb-1.5 w-full">
              <span className="hidden sm:inline-block font-vazir text-sm text-amber-700 dark:text-amber-600">
                {author}
              </span>
              <span className="font-vazir text-sm text-emerald-700 dark:text-emerald-400">
                {publishedDate.toLocaleString('fa-IR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <Link
                href={`blog/${id}`}
                className="flex items-center justify-center sm:hidden gap-x-1 ml-1.5 bg-yellow-200/20 text-yellow-700 h-5 pr-2.5 pl-2 rounded-md font-vazir-md text-xs md:text-sm">
                مطالعه
                <Icon name="chevLeft" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-yellow-100 dark:bg-stone-700 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
          <p className="text-sm md:text-base text-stone-700 dark:text-white mb-4">
            {summary}. . .
          </p>
          <Link
            href={`blog/${id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            مطالعه مطلب
          </Link>
        </div>
      </div>
    </div>
  );
}
