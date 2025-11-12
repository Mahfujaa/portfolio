'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';
import { ImageUpload } from '@/components/ImageUpload';
import { Quote } from 'lucide-react';

const defaultTestimonials = {
  label: 'Testimonials',
  title: 'Trusted By Visionary Teams',
  description:
    'Clients describe my work as strategic, collaborative, and relentlessly detail-driven.',
  items: [
    {
      text:
        'Muna has an uncanny ability to translate lofty ideas into tangible products. She took our scattered requirements, built alignment across leadership, and delivered a design system that still scales today.',
      author: 'Niki Civinema',
      role: 'VP of Product · LipaPay',
      avatar: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
    },
    {
      text:
        'From stakeholder workshops to the final handoff, her process is world-class. Every iteration was grounded in evidence, and the end result increased our signups 42% in the first month.',
      author: 'Samuel Kimani',
      role: 'Head of Growth · Nimbus Health',
      avatar: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
    },
    {
      text:
        'If you need someone who can lead design strategically while still obsessing the pixels, look no further. Muna is that rare mix of visionary and doer.',
      author: 'Ivy Mugo',
      role: 'Creative Director · Horizon Studio',
      avatar: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
    },
  ],
};

export const Testimonials = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const testimonials = portfolio?.testimonials ?? defaultTestimonials;

  if (!portfolio) return null;

  const handleSave = async (field: string, value: any) => {
    const base = { ...defaultTestimonials, ...testimonials };
    const updatedTestimonials = { ...base, [field]: value };
    const updatedPortfolio = await updateSectionAPI('testimonials', updatedTestimonials);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleItemSave = async (index: number, field: string, value: string) => {
    const baseItems = testimonials.items?.length
      ? testimonials.items
      : defaultTestimonials.items;
    const updatedItems = baseItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    const updatedTestimonials = { ...defaultTestimonials, ...testimonials, items: updatedItems };
    const updatedPortfolio = await updateSectionAPI('testimonials', updatedTestimonials);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleAvatarUpload = async (index: number, url: string) => {
    const baseItems = testimonials.items?.length
      ? testimonials.items
      : defaultTestimonials.items;
    const updatedItems = baseItems.map((item, i) =>
      i === index ? { ...item, avatar: url } : item
    );
    const updatedTestimonials = { ...defaultTestimonials, ...testimonials, items: updatedItems };
    const updatedPortfolio = await updateSectionAPI('testimonials', updatedTestimonials);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const testimonialsToRender =
    testimonials.items?.length ? testimonials.items : defaultTestimonials.items;

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6 max-w-lg">
            <InlineEditable
              value={testimonials.label}
              onSave={(value) => handleSave('label', value)}
              placeholder={defaultTestimonials.label}
              className="text-sm font-semibold uppercase tracking-[0.35rem] text-[#3390AF]"
            />
            <InlineEditable
              value={testimonials.title}
              onSave={(value) => handleSave('title', value)}
              placeholder={defaultTestimonials.title}
              className="text-4xl md:text-5xl font-bold text-black"
            />
            <InlineEditable
              value={testimonials.description}
              onSave={(value) => handleSave('description', value)}
              as="textarea"
              className="text-gray-600 leading-relaxed"
              placeholder={defaultTestimonials.description}
            />
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="relative bg-[#3390AF] text-white rounded-[32px] px-10 sm:px-14 py-16 shadow-2xl w-full max-w-[420px] text-center">
              <Quote className="h-16 w-16 text-white/20 mx-auto mb-10" />
              <InlineEditable
                value={testimonialsToRender[0]?.text ?? defaultTestimonials.items[0].text}
                onSave={(value) => handleItemSave(0, 'text', value)}
                as="textarea"
                className="text-white leading-relaxed mb-10 min-h-[130px]"
                placeholder={defaultTestimonials.items[0].text}
              />

              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-20 h-20">
                <ImageUpload
                  currentImage={
                    testimonialsToRender[0]?.avatar ?? defaultTestimonials.items[0].avatar
                  }
                  onUpload={(url) => handleAvatarUpload(0, url)}
                  alt={testimonialsToRender[0]?.author ?? defaultTestimonials.items[0].author}
                  className="w-full h-full rounded-full border-4 border-white shadow-xl"
                />
              </div>
            </div>

            <div className="text-center">
              <InlineEditable
                value={testimonialsToRender[0]?.author ?? defaultTestimonials.items[0].author}
                onSave={(value) => handleItemSave(0, 'author', value)}
                placeholder={defaultTestimonials.items[0].author}
                className="text-[#3390AF] font-semibold text-xl"
              />
              <InlineEditable
                value={testimonialsToRender[0]?.role ?? defaultTestimonials.items[0].role}
                onSave={(value) => handleItemSave(0, 'role', value)}
                placeholder={defaultTestimonials.items[0].role ?? 'Enter role here...'}
                className="text-gray-500 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

