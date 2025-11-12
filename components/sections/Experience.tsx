'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';

const defaultExperience = {
  label: 'My Experiences',
  title: 'Design Journey So Far',
  description:
    'From scrappy startups to global organizations, I’ve helped teams launch experiences that users love—and goals that stakeholders trust.',
  items: [
    {
      title: 'Lead Product Designer',
      description:
        'Led cross-functional squads shipping payments, analytics, and onboarding flows used by 5M+ users.',
      company: 'Flutterwave · Remote',
      years: '2022 — Present',
    },
    {
      title: 'Senior UX Designer',
      description:
        'Partnered with growth teams to launch multi-market campaigns that increased retention by 34%.',
      company: 'Andela · Nairobi',
      years: '2019 — 2022',
    },
    {
      title: 'Brand & Visual Designer',
      description:
        'Delivered multi-channel brand refreshes for tech and lifestyle clients across EMEA.',
      company: 'Freelance Collective',
      years: '2016 — 2019',
    },
  ],
};

export const Experience = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const experience = portfolio?.experience ?? defaultExperience;

  if (!portfolio) return null;

  const handleSave = async (field: string, value: any) => {
    const base = { ...defaultExperience, ...experience };
    const updatedExperience = { ...base, [field]: value };
    const updatedPortfolio = await updateSectionAPI('experience', updatedExperience);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleItemSave = async (index: number, field: string, value: string) => {
    const baseItems = experience.items?.length
      ? experience.items
      : defaultExperience.items;
    const updatedItems = baseItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    const updatedExperience = { ...defaultExperience, ...experience, items: updatedItems };
    const updatedPortfolio = await updateSectionAPI('experience', updatedExperience);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const experienceToRender =
    experience.items?.length ? experience.items : defaultExperience.items;

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="flex items-start gap-8">
            <div className="flex-1">
              <InlineEditable
                value={experience.label}
                onSave={(value) => handleSave('label', value)}
                placeholder={defaultExperience.label}
                className="text-sm text-gray-500 uppercase tracking-wider mb-2 block"
              />
              <InlineEditable
                value={experience.title}
                onSave={(value) => handleSave('title', value)}
                placeholder={defaultExperience.title}
                className="text-4xl md:text-5xl font-bold text-black"
              />
            </div>
            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-gray-300 self-stretch"></div>
          </div>
          <div className="flex items-center">
            <InlineEditable
              value={experience.description}
              onSave={(value) => handleSave('description', value)}
              as="textarea"
              className="text-gray-600 leading-relaxed"
              placeholder={defaultExperience.description}
            />
          </div>
        </div>

        {/* Experience Cards with Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {experienceToRender.map((exp, index) => (
            <div key={index} className="relative flex flex-col items-center pb-16">
              {/* Experience Card */}
              <div className="bg-[#3390AF] text-white p-8 rounded-2xl w-full text-center">
                <InlineEditable
                  value={exp.title}
                  onSave={(value) => handleItemSave(index, 'title', value)}
                  placeholder={defaultExperience.items[index]?.title}
                  className="text-2xl font-bold mb-4"
                />
                <div className="mb-4">
                  <InlineEditable
                    value={exp.description}
                    onSave={(value) => handleItemSave(index, 'description', value)}
                    as="textarea"
                    className="text-white leading-relaxed mb-4 min-h-[100px] text-sm"
                    placeholder={defaultExperience.items[index]?.description}
                  />
                </div>
                <InlineEditable
                  value={exp.company}
                  onSave={(value) => handleItemSave(index, 'company', value)}
                  placeholder={defaultExperience.items[index]?.company}
                  className="text-lg font-bold mb-2"
                />
                <InlineEditable
                  value={exp.years}
                  onSave={(value) => handleItemSave(index, 'years', value)}
                  placeholder={defaultExperience.items[index]?.years}
                  className="text-sm text-white"
                />
              </div>
              
              {/* Vertical Line connecting card to marker */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-px h-8 bg-[#3390AF]"></div>
              
              {/* Timeline Marker */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#3390AF] border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

