'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';
import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { Twitter, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { CTA } from './CTA';

const SECTION_CONFIG = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'cta', label: 'Contact' },
];

const SOCIAL_ICONS = [Twitter, Instagram, Facebook, Linkedin, Youtube];

export const Footer = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);

  if (!portfolio?.footer) return null;

  const handleSave = async (field: string, value: any) => {
    const updatedFooter = { ...portfolio.footer, [field]: value };
    const updatedPortfolio = await updateSectionAPI('footer', updatedFooter);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const scrollToSection = useCallback((event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <footer id="footer" className="relative overflow-hidden text-[#0f3a4a] -mt-44">
      <div className="absolute inset-0 pointer-events-none">
     
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-cover bg-center"
          style={{ backgroundImage: "url('/footerBottom.jpg')" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-8 lg:px-16 pb-20 space-y-14  mt-24">
        <div className="mt-76 pt-12">
         <CTA/>
        </div>

        <div className="flex flex-col items-center gap-6 ">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/70 rounded-2xl flex items-center justify-center shadow">
              <span className="text-[#3390AF] font-bold text-3xl">P</span>
            </div>
            <InlineEditable
              value={portfolio.footer.logo}
              onSave={(value) => handleSave('logo', value)}
              className="text-[#0f3a4a] font-bold text-3xl"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold tracking-wide text-[#0f3a4a] uppercase">
            {SECTION_CONFIG.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => scrollToSection(event, section.id)}
                className="hover:text-[#3390AF] transition-colors"
              >
                {section.label}
              </a>
            ))}
          </div>

          <div className="flex gap-6 pt-4 flex-wrap justify-center">
            {(() => {
              const defaultSocialLinks = [
                'https://dribbble.com',
                'https://behance.net',
                'https://linkedin.com',
                'https://twitter.com',
                'https://instagram.com',
              ];
              const socialLinks = portfolio.footer.socialLinks?.length 
                ? portfolio.footer.socialLinks 
                : defaultSocialLinks;
              
              return socialLinks.map((link, index) => {
                const IconComponent = SOCIAL_ICONS[index] || Twitter;
                if (!IconComponent) return null;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <a
                      href={link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#3390AF] rounded-full flex items-center justify-center hover:bg-[#2a7a95] transition-colors"
                      aria-label={`Social link ${index + 1}`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </a>
                    <InlineEditable
                      value={link || ''}
                      displayValue=""
                      className="w-full"
                      onSave={async (value) => {
                        const sourceLinks = portfolio.footer.socialLinks?.length
                          ? portfolio.footer.socialLinks
                          : defaultSocialLinks;
                        const updatedLinks = sourceLinks.map((l, i) =>
                          i === index ? value : l
                        );
                        await handleSave('socialLinks', updatedLinks);
                      }}
                      placeholder={defaultSocialLinks[index] ?? 'https://'}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

    </footer>
  );
};

