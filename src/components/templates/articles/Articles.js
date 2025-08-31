"use client"

import React from 'react';
import { getArticles } from '@/libs/articlesApi';
import { useQuery } from '@tanstack/react-query';
import Article from '@/components/modules/article/Article';
import SectionHeader from '@/components/common/SectionHeader';

export default function Articles() {
  const { data } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const articles = Array.isArray(data) ? data : data?.data || [];
  return (
    <section className="blog">
      <div className="container">
        <SectionHeader
          className="mt-8 md:mt-10"
          title="مطالب خواندنی"
          subTitle="از دنیای دانه تا هنر دم‌آوری"
          link="مشاهده همه"
          href="/blog"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-5">
          {articles.slice(0, 8).map((article) => (
            <Article
              key={article._id}
              id={article._id}
              img={article.img}
              title={article.title}
              author={article.author}
              publishedAt={article.publishedAt}
              summary={article.summary}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
