'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';

const defaultServices = {
  label: 'My Services',
  title: 'Design That Moves Brands Forward',
  description:
    'I collaborate with visionary founders, marketing teams, and agencies to transform complex problems into effortless customer journeys.',
  items: [
    {
      icon: '💻',
      title: 'Product Design Sprints',
      description:
        'Rapid discovery, user testing, and validated prototypes to get your next big idea investor-ready.',
      linkText: 'Plan a sprint →',
    },
    {
      icon: '🎨',
      title: 'Brand Systems',
      description:
        'Complete identity systems with usage guidelines that keep every touchpoint consistent and on-brand.',
      linkText: 'View brand work →',
    },
    {
      icon: '🌐',
      title: 'Marketing Websites',
      description:
        'Conversion-driven landing pages built with performance, SEO, and analytics in mind.',
      linkText: 'See live sites →',
    },
  ],
};

export const Services = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const services = portfolio?.services ?? defaultServices;

  if (!portfolio) return null;

  const handleSave = async (field: string, value: any) => {
    const base = { ...defaultServices, ...services };
    const updatedServices = { ...base, [field]: value };
    const updatedPortfolio = await updateSectionAPI('services', updatedServices);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleItemSave = async (index: number, field: string, value: string) => {
    const baseItems = services.items?.length
      ? services.items
      : defaultServices.items;
    const updatedItems = baseItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    const updatedServices = { ...defaultServices, ...services, items: updatedItems };
    const updatedPortfolio = await updateSectionAPI('services', updatedServices);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const servicesToRender =
    services.items?.length ? services.items : defaultServices.items;

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <InlineEditable
            value={services.label}
            onSave={(value) => handleSave('label', value)}
            placeholder={defaultServices.label}
            className="text-sm text-gray-500 uppercase tracking-wider mb-2"
          />
          <InlineEditable
            value={services.title}
            onSave={(value) => handleSave('title', value)}
            placeholder={defaultServices.title}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          />
          <InlineEditable
            value={services.description}
            onSave={(value) => handleSave('description', value)}
            as="textarea"
            className="text-gray-600 leading-relaxed"
            placeholder={defaultServices.description}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesToRender.map((service, index) => (
            <div
              key={index}
              className="relative bg-[#3390AF] rounded-2xl p-8 pt-16 hover:shadow-lg transition-shadow"
            >
              {/* Top Tab/Notch */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-[#3390AF] rounded-t-full">
                <div className="w-full h-full flex items-center justify-center pt-2">
                  <div className="w-8 h-8 border-2 border-white rounded flex items-center justify-center">
                    <InlineEditable
                      value={service.icon}
                      onSave={(value) => handleItemSave(index, 'icon', value)}
                      placeholder={defaultServices.items[index]?.icon}
                      className="text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-4 text-center">
                <InlineEditable
                  value={service.title}
                  onSave={(value) => handleItemSave(index, 'title', value)}
                  placeholder={defaultServices.items[index]?.title}
                  className="text-2xl font-bold text-white mb-4"
                />
                <div className="mb-6">
                  <InlineEditable
                    value={service.description}
                    onSave={(value) => handleItemSave(index, 'description', value)}
                    as="textarea"
                    className="text-white leading-relaxed min-h-[100px] text-sm text-center"
                    placeholder={defaultServices.items[index]?.description}
                  />
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

