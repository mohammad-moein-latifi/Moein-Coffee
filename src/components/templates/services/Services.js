import React from 'react';
import { services } from '@/constants/services';
import Service from '@/components/modules/service/Service';

export default function Services() {
  return (
    <section className="services mb-12 lg:mb-36">
      <div className="container">
        <div className="flex items-center justify-between gap-y-11 flex-wrap *:w-1/2 lg:*:w-auto text-stone-800 dark:text-white">
          {services.map((service) => (
            <Service
              key={service.id}
              title={service.title}
              desc={service.desc}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
