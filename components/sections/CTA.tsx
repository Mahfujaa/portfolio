'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';

const defaultCTA = {
  label: "Let's Talk",
  title: 'Let’s Build Something Bold',
  description:
    'Tell me about your product, campaign, or idea. I’ll respond within 48 hours with next steps and a tailored collaboration plan.',
  buttonText: 'Book a discovery call',
  backgroundImage: '/imgi_41_striped-blue-watercolor-banner-blog-XBWPYHE.jpg',
};

export const CTA = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const cta = portfolio?.cta ?? defaultCTA;

  if (!portfolio) return null;

  const handleSave = async (field: string, value: any) => {
    const base = { ...defaultCTA, ...cta };
    const updatedCTA = { ...base, [field]: value };
    const updatedPortfolio = await updateSectionAPI('cta', updatedCTA);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const backgroundImage =
    cta.backgroundImage || defaultCTA.backgroundImage;

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute "></div>
      <div className="relative container mx-auto px-4 sm:px-8 lg:px-16 ">
        <div className="flex flex-col lg:flex-row items-center  justify-between gap-12">
          <div className="space-y-5 flex flex-col items-start max-w-2xl text-[#0f3a4a]">
            <InlineEditable
              value={cta.label}
              onSave={(value) => handleSave('label', value)}
              placeholder={defaultCTA.label}
              className="text-sm uppercase tracking-[0.35rem] text-[#3390AF] font-semibold"
            />
            <InlineEditable
              value={cta.title}
              onSave={(value) => handleSave('title', value)}
              placeholder={defaultCTA.title}
              className="text-4xl md:text-5xl font-bold"
            />
            <InlineEditable
              value={cta.description}
              onSave={(value) => handleSave('description', value)}
              as="textarea"
              className="text-[#0f3a4a]/80 leading-relaxed text-start"
              placeholder={defaultCTA.description}
            />
          </div>

          <InlineEditable
            value={cta.buttonText}
            onSave={(value) => handleSave('buttonText', value)}
            placeholder={defaultCTA.buttonText}
            className="inline-flex items-center justify-center px-12 py-4 bg-[#3390AF] text-white rounded-lg shadow-lg hover:bg-[#2a7a95] transition-colors text-base font-semibold whitespace-nowrap"
          />
        </div>
      </div>
    </section>
  );
};
