'use client';

import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';
import {
  ImageUpload,
  type ImageUploadHandle,
} from '@/components/ImageUpload';
import { Upload } from 'lucide-react';

const defaultExpertise = {
  label: 'Why Choose Me',
  title: 'What I’m Exceptional At',
  description:
    'A rare mix of strategy, systems thinking, and craft. I design with empathy, iterate with data, and ship with engineering.',
  skills: [
    { name: 'Design Systems & Tokens', percentage: 96 },
    { name: 'Conversion-Focused UX', percentage: 92 },
    { name: 'Collaborative Prototyping', percentage: 94 },
    { name: 'Brand Strategy & Art Direction', percentage: 89 },
  ],
  images: [
    '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
    '/imgi_41_striped-blue-watercolor-banner-blog-XBWPYHE.jpg',
  ],
};

export const Expertise = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const expertise = portfolio?.expertise ?? defaultExpertise;
  const isEditing = useAppSelector((state) => state.portfolio.isEditing);
  const heroUploadRef = useRef<ImageUploadHandle>(null);
  const secondaryUploadRef = useRef<ImageUploadHandle>(null);

  if (!portfolio) return null;

  const handleSave = async (field: string, value: any) => {
    const base = { ...defaultExpertise, ...expertise };
    const updatedExpertise = { ...base, [field]: value };
    const updatedPortfolio = await updateSectionAPI('expertise', updatedExpertise);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleSkillSave = async (index: number, field: string, value: string | number) => {
    const baseSkills = expertise.skills?.length
      ? expertise.skills
      : defaultExpertise.skills;
    const updatedSkills = baseSkills.map((skill, i) => {
      if (i !== index) return skill;
      const nextValue =
        field === 'percentage'
          ? Number(value) || 0
          : value;
      return { ...skill, [field]: nextValue };
    });
    const updatedExpertise = { ...defaultExpertise, ...expertise, skills: updatedSkills };
    const updatedPortfolio = await updateSectionAPI('expertise', updatedExpertise);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleImageUpload = async (index: number, url: string) => {
    const baseImages = expertise.images?.length
      ? [...expertise.images]
      : [...defaultExpertise.images];
    const updatedImages = [...baseImages];
    updatedImages[index] = url;
    const updatedExpertise = { ...defaultExpertise, ...expertise, images: updatedImages };
    const updatedPortfolio = await updateSectionAPI('expertise', updatedExpertise);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const skillsToRender =
    expertise.skills?.length ? expertise.skills : defaultExpertise.skills;

  const mainImage =
    expertise.images?.[0] ?? defaultExpertise.images[0];
  const secondaryImage =
    expertise.images?.[1] ?? defaultExpertise.images[1];

  return (
    <section id="expertise" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] overflow-hidden shadow-xl bg-[#3390AF] text-white">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center px-6 sm:px-10 md:px-16 py-12 lg:py-16">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
              <ImageUpload
                currentImage={mainImage}
                onUpload={(url) => handleImageUpload(0, url)}
                alt="Expertise hero"
                className="w-full h-full object-cover"
                showInternalTrigger={false}
                ref={heroUploadRef}
              />
              
              <button
                type="button"
                onClick={() => heroUploadRef.current?.openFileDialog()}
                className={`absolute top-4 right-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full border-2 border-[#3390AF] bg-white text-[#1f6f86] shadow-2xl transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#3390AF]/40 ${isEditing ? 'flex' : ''}`}
                aria-label="Upload expertise hero image"
              >
                <Upload className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 text-center lg:text-left">
              <div className="[&_button]:!opacity-100 [&_button]:bg-white/20 [&_button]:hover:bg-white/30 [&_button_svg]:text-white">
                <InlineEditable
                  value={expertise.label}
                  onSave={(value) => handleSave('label', value)}
                  placeholder={defaultExpertise.label}
                  className="text-sm uppercase tracking-[0.35rem] text-white/80"
                />
              </div>
              <div className="[&_button]:!opacity-100 [&_button]:bg-white/20 [&_button]:hover:bg-white/30 [&_button_svg]:text-white">
                <InlineEditable
                  value={expertise.title}
                  onSave={(value) => handleSave('title', value)}
                  placeholder={defaultExpertise.title}
                  className="text-4xl md:text-5xl font-bold"
                />
              </div>
              <div className="relative [&_button]:!opacity-100 [&_button]:bg-white/20 [&_button]:hover:bg-white/30 [&_button_svg]:text-white">
                <InlineEditable
                  value={expertise.description}
                  onSave={(value) => handleSave('description', value)}
                  as="textarea"
                  className="text-white/90 leading-relaxed"
                  placeholder={defaultExpertise.description}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="relative w-full lg:w-1/2 rounded-[28px] overflow-hidden shadow-2xl">
            <ImageUpload
              currentImage={secondaryImage}
              onUpload={(url) => handleImageUpload(1, url)}
              alt="Expertise secondary"
              className="w-full h-full object-cover"
              showInternalTrigger={false}
              ref={secondaryUploadRef}
            />
            <button
              type="button"
              onClick={() => secondaryUploadRef.current?.openFileDialog()}
              className={`absolute top-4 right-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full border-2 border-[#3390AF] bg-white text-[#1f6f86] shadow-2xl transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#3390AF]/40 ${isEditing ? 'flex' : ''}`}
              aria-label="Upload expertise secondary image"
            >
              <Upload className="h-5 w-5" />
            </button>
          </div>

          <div className="w-full lg:flex-1 space-y-8">
            {skillsToRender.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-3 gap-4">
                  <div className="[&_button]:!opacity-100 [&_button]:bg-gray-100 [&_button]:hover:bg-gray-200 [&_button_svg]:text-[#3390AF]">
                    <InlineEditable
                      value={skill.name}
                      onSave={(value) => handleSkillSave(index, 'name', value)}
                      placeholder={defaultExpertise.skills[index]?.name}
                      className="text-base md:text-lg font-semibold text-gray-800"
                    />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <div className="[&_button]:!opacity-100 [&_button]:bg-gray-100 [&_button]:hover:bg-gray-200 [&_button_svg]:text-[#3390AF]">
                      <InlineEditable
                        value={String(skill.percentage)}
                        onSave={(value) => handleSkillSave(index, 'percentage', value)}
                        placeholder={String(defaultExpertise.skills[index]?.percentage)}
                        className="text-sm text-gray-600 text-right min-w-[2ch]"
                      />
                    </div>
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
                <div className="relative h-3 w-full bg-[#d4edf6] rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#3390AF] rounded-full"
                    style={{ width: `${Math.min(Number(skill.percentage) || 0, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

