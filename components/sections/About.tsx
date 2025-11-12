'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';
import { ImageUpload } from '@/components/ImageUpload';
import { Check } from 'lucide-react';
import { Award, Twitter, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

const defaultAbout = {
  label: 'About Me',
  title: 'Call Me, Muna',
  description:
    'I’m a Nairobi-based creative focused on building unforgettable digital product experiences. From strategy to pixel-perfect interfaces, I help brands translate big ideas into elegant, human-centered design.',
  points: [
    'Product strategy grounded in research-driven insights',
    'Design systems that keep teams aligned and shipping faster',
    'Interfaces crafted for accessibility, performance, and delight',
  ],
  signature: 'Muna Tariq',
  role: 'Product Designer · Visual Storyteller',
  socialLinks: [
    'https://dribbble.com',
    'https://behance.net',
    'https://linkedin.com',
  ],
  image: '/imgi_2_hero-home-bg-perzifo-by-hellokuro-and-okko-w.png',
  award: {
    title: 'Product Hunt “Golden Kitty” Winner',
    subtitle: 'Top Product · January 2024',
  },
};

export const About = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const about = portfolio?.about ?? defaultAbout;

  if (!portfolio) return null;

  const handleSave = async (field: string, value: any) => {
    const base = { ...defaultAbout, ...about };
    const updatedAbout = { ...base, [field]: value };
    const updatedPortfolio = await updateSectionAPI('about', updatedAbout);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleImageUpload = async (url: string) => {
    const updatedAbout = { ...defaultAbout, ...about, image: url };
    const updatedPortfolio = await updateSectionAPI('about', updatedAbout);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const socialIcons = [Twitter, Instagram, Facebook, Linkedin, Youtube];
  const pointsToRender = about.points?.length ? about.points : defaultAbout.points;
  const socialLinksToRender =
    about.socialLinks?.length ? about.socialLinks : defaultAbout.socialLinks;
  const award = about.award ?? defaultAbout.award;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Image with Award Badge */}
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
            {/* Abstract Light Blue Brushstroke Shapes on Left */}
            <div className="absolute -left-8 top-0 bottom-0 w-32 opacity-30 z-0">
              <div className="absolute top-10 w-24 h-32 bg-[#3390AF] rounded-full transform rotate-12 blur-sm"></div>
              <div className="absolute top-32 w-16 h-24 bg-[#3390AF] rounded-full transform -rotate-12 blur-sm"></div>
              <div className="absolute bottom-20 w-20 h-28 bg-[#3390AF] rounded-full transform rotate-6 blur-sm"></div>
            </div>
            
            {/* Main Image */}
            <div className="relative z-10 w-full h-full rounded-lg overflow-hidden">
              <ImageUpload
                currentImage={about.image || defaultAbout.image}
                onUpload={handleImageUpload}
                alt="About me"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Award Badge - Bottom Left */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center shadow-lg rounded-lg overflow-hidden">
              {/* Left Part - Teal Blue Square with Icon */}
              <div className="bg-[#2C9A7A] w-16 h-16 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              {/* Right Part - White Rectangle with Text */}
              <div className="bg-white px-4 py-3">
                <InlineEditable
                  value={award.title}
                  onSave={(value) => handleSave('award', { ...award, title: value })}
                  placeholder={defaultAbout.award.title}
                  className="text-sm font-bold text-black block mb-1"
                />
                <InlineEditable
                  value={award.subtitle}
                  onSave={(value) => handleSave('award', { ...award, subtitle: value })}
                  placeholder={defaultAbout.award.subtitle}
                  className="text-xs text-gray-600 block"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Text Content */}
          <div className="space-y-6">
            {/* About Me Label */}
            <InlineEditable
              value={about.label}
              onSave={(value) => handleSave('label', value)}
              placeholder={defaultAbout.label}
              className="text-sm text-[#3390AF] uppercase tracking-wider font-medium"
            />
            
            {/* Main Heading */}
            <InlineEditable
              value={about.title}
              onSave={(value) => handleSave('title', value)}
              placeholder={defaultAbout.title}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black"
            />
            
            {/* Description Paragraph */}
            <InlineEditable
              value={about.description}
              onSave={(value) => handleSave('description', value)}
              as="textarea"
              className="text-gray-700 leading-relaxed min-h-[100px]"
              placeholder="Enter description here..."
            />
            
            {/* Bullet Points with Checkmarks */}
            <div className="space-y-3">
              {pointsToRender.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-black mt-1 flex-shrink-0 stroke-2" />
                  <InlineEditable
                    value={point}
                    onSave={async (value) => {
                      const sourcePoints =
                        about.points?.length ? about.points : defaultAbout.points;
                      const updatedPoints = sourcePoints.map((p, i) =>
                        i === index ? value : p
                      );
                      await handleSave('points', updatedPoints);
                    }}
                    placeholder={defaultAbout.points[index]}
                    className="text-gray-700 flex-1"
                  />
                </div>
              ))}
            </div>
            
            {/* Signature and Role */}
            <div className="pt-4">
              <InlineEditable
                value={about.signature}
                onSave={(value) => handleSave('signature', value)}
                placeholder={defaultAbout.signature}
                className="text-3xl font-bold text-black mb-1 block font-[cursive]"
              />
              <InlineEditable
                value={about.role}
                onSave={(value) => handleSave('role', value)}
                placeholder={defaultAbout.role}
                className="text-gray-600 text-sm"
              />
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-6 pt-4 flex-wrap">
              {socialLinksToRender.map((link, index) => {
                const IconComponent = socialIcons[index] || Twitter;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#3390AF] rounded-full flex items-center justify-center hover:bg-[#2a7a95] transition-colors"
                      aria-label={`Social link ${index + 1}`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </a>
                    <InlineEditable
                      value={link}
                      displayValue=""
                      className="w-full"
                      onSave={async (value) => {
                        const sourceLinks =
                          about.socialLinks?.length
                            ? about.socialLinks
                            : defaultAbout.socialLinks;
                        const updatedLinks = sourceLinks.map((l, i) =>
                          i === index ? value : l
                        );
                        await handleSave('socialLinks', updatedLinks);
                      }}
                      placeholder={defaultAbout.socialLinks[index] ?? 'https://'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

