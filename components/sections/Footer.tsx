'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';
import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { Twitter, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

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
    <footer id="footer" className="relative overflow-hidden text-[#0f3a4a]">
      <div className="absolute inset-0 pointer-events-none">
     
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-cover bg-center"
          style={{ backgroundImage: "url('/footerBottom.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-8 lg:px-16 py-20 space-y-14  mt-24">
        <div className="flex flex-col items-center text-center gap-6">
         
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

          <div className="flex gap-4 justify-center">
            {portfolio.footer.socialLinks.map((link, index) => {
              const Icon = SOCIAL_ICONS[index] || Twitter;
              return (
                <div
                  key={index}
                  className="group w-11 h-11 rounded-full border border-[#0f3a4a]/30 flex items-center justify-center bg-white/60 backdrop-blur-sm shadow-sm hover:border-[#3390AF] hover:-translate-y-0.5 transition-all"
                >
                  <Icon className="h-4 w-4 text-[#3390AF] group-hover:text-[#0f3a4a] transition-colors" />
                  <span className="sr-only">{link}</span>
                  <InlineEditable
                    value={link}
                    onSave={async (value) => {
                      const updatedLinks = portfolio.footer.socialLinks.map((l, i) => (i === index ? value : l));
                      await handleSave('socialLinks', updatedLinks);
                    }}
                    className="hidden"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative bg-[#1a6f8b] text-white/80 py-4">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
          <InlineEditable
            value={portfolio.footer.copyright}
            onSave={(value) => handleSave('copyright', value)}
            className="text-center lg:text-left"
          />
          <InlineEditable
            value={portfolio.footer.credit}
            onSave={(value) => handleSave('credit', value)}
            className="text-center lg:text-right"
          />
        </div>
      </div>
    </footer>
  );
};

