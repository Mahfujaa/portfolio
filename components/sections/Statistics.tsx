'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';

const defaultStatistics = [
  { number: '10+', label: 'Years shipping product' },
  { number: '58', label: 'Products launched' },
  { number: '32%', label: 'Avg. conversion lift' },
  { number: '3', label: 'Design awards' },
];

export const Statistics = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const statistics = portfolio?.statistics ?? [];

  if (!portfolio) return null;

  const handleSave = async (index: number, field: string, value: string) => {
    const sourceStats =
      statistics.length > 0 ? statistics : defaultStatistics;

    const updatedStats = sourceStats.map((stat, i) =>
      i === index ? { ...stat, [field]: value } : stat
    );
    const updatedPortfolio = await updateSectionAPI('statistics', updatedStats);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const statsToRender =
    statistics.length > 0 ? statistics : defaultStatistics;

  return (
    <section id="statistics" className="pb-2 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* White Container with Light Blue Border */}
        <div className="bg-white border border-[#3390AF] rounded-lg p-8 md:p-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {statsToRender.map((stat, index) => (
              <div key={index} className="text-center">
                <InlineEditable
                  value={stat.number}
                  onSave={(value) => handleSave(index, 'number', value)}
                  placeholder={defaultStatistics[index]?.number}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 block"
                />
                <InlineEditable
                  value={stat.label}
                  onSave={(value) => handleSave(index, 'label', value)}
                  placeholder={defaultStatistics[index]?.label}
                  className="text-[#3390AF] text-sm md:text-base font-normal block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

