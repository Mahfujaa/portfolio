'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';
import { Button } from '@/components/ui/button';
import { useCallback, useMemo } from 'react';
import type { MouseEvent } from 'react';

const SECTION_CONFIG = [
  { id: 'hero', defaultLabel: 'Home' },
  { id: 'about', defaultLabel: 'About' },
  { id: 'services', defaultLabel: 'Services' },
  { id: 'experience', defaultLabel: 'Experience' },
  { id: 'expertise', defaultLabel: 'Expertise' },
  { id: 'testimonials', defaultLabel: 'Testimonials' },
  { id: 'cta', defaultLabel: 'Contact' },
];

export const Header = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const isEditing = useAppSelector((state) => state.portfolio.isEditing);

  if (!portfolio?.header) return null;

  const handleSave = async (field: string, value: string) => {
    const updatedHeader = { ...portfolio.header, [field]: value };
    const updatedPortfolio = await updateSectionAPI('header', updatedHeader);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const navItems = useMemo(() => {
    return SECTION_CONFIG.map((section, index) => {
      const existing = portfolio.header.navLinks?.[index];
      const matchesAnchor = existing?.href === `#${section.id}`;
      return {
        id: section.id,
        label: matchesAnchor && existing?.label ? existing.label : section.defaultLabel,
      };
    });
  }, [portfolio.header.navLinks]);

  const handleNavLabelSave = useCallback(
    async (index: number, value: string) => {
      const updatedLinks = SECTION_CONFIG.map((section, idx) => {
        const existing = portfolio.header.navLinks?.[idx];
        const matchesAnchor = existing?.href === `#${section.id}`;
        const label = idx === index
          ? value
          : matchesAnchor && existing?.label
            ? existing.label
            : section.defaultLabel;
        return {
          label,
          href: `#${section.id}`,
          dropdown: false,
        };
      });
      const updatedHeader = { ...portfolio.header, navLinks: updatedLinks };
      const updatedPortfolio = await updateSectionAPI('header', updatedHeader);
      dispatch(setPortfolio(updatedPortfolio));
    },
    [dispatch, portfolio.header]
  );

  const scrollToSection = useCallback((event: MouseEvent<HTMLElement>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#3390AF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <InlineEditable
              value={portfolio.header.logo}
              onSave={(value) => handleSave('logo', value)}
              className="text-gray-700 font-semibold text-xl"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div key={item.id} className="relative">
                {isEditing ? (
                  <InlineEditable
                    value={item.label}
                    onSave={(value) => handleNavLabelSave(index, value)}
                    className="text-gray-700"
                  />
                ) : (
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => scrollToSection(event, item.id)}
                    className="text-gray-700 hover:text-[#3390AF] transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          <Button
            className="bg-[#3390AF] hover:bg-[#2a7a95] text-white px-6 py-2 rounded"
            onClick={(event) => scrollToSection(event, 'cta')}
          >
            <InlineEditable
              value={portfolio.header.hireButton}
              onSave={(value) => handleSave('hireButton', value)}
              className="text-white"
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

