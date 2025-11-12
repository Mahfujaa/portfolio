'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio } from '@/store/portfolioSlice';
import { updateSection as updateSectionAPI } from '@/lib/services/portfolioService';
import { InlineEditable } from '@/components/InlineEditable';
import { ImageUpload, type ImageUploadHandle } from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Pencil, Check, X, Upload } from 'lucide-react';
import Image from 'next/image';

export const Hero = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const isEditing = useAppSelector((state) => state.portfolio.isEditing);
  const imageUploadRef = useRef<ImageUploadHandle>(null);

  const [isButtonEditing, setIsButtonEditing] = useState(false);
  const [buttonText, setButtonText] = useState(portfolio?.hero?.cvButton || '');
  const [buttonLink, setButtonLink] = useState(portfolio?.hero?.cvLink || '');

  const handleSave = async (field: string, value: string) => {
    if (!portfolio?.hero) return;
    const updatedHero = { ...portfolio.hero, [field]: value };
    const updatedPortfolio = await updateSectionAPI('hero', updatedHero);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleImageUpload = async (url: string) => {
    if (!portfolio?.hero) return;
    const updatedHero = { ...portfolio.hero, personImage: url };
    const updatedPortfolio = await updateSectionAPI('hero', updatedHero);
    dispatch(setPortfolio(updatedPortfolio));
  };

  const handleButtonSave = async () => {
    if (!portfolio?.hero) return;
    const updatedHero = {
      ...portfolio.hero,
      cvButton: buttonText,
      cvLink: buttonLink,
    };
    const updatedPortfolio = await updateSectionAPI('hero', updatedHero);
    dispatch(setPortfolio(updatedPortfolio));
    setIsButtonEditing(false);
  };

  const handleButtonCancel = () => {
    if (!portfolio?.hero) return;
    setButtonText(portfolio.hero.cvButton || '');
    setButtonLink(portfolio.hero.cvLink || '');
    setIsButtonEditing(false);
  };

  useEffect(() => {
    if (!portfolio?.hero) return;
    setButtonText(portfolio.hero.cvButton || '');
    setButtonLink(portfolio.hero.cvLink || '');
  }, [portfolio?.hero?.cvButton, portfolio?.hero?.cvLink, portfolio?.hero]);

  if (!portfolio?.hero) return null;

  const heroData = portfolio.hero as typeof portfolio.hero & { personImage?: string; backgroundImage?: string };
  const personImage = heroData.personImage || heroData.backgroundImage || '/persons.png';

  const renderDownloadButton = () => {
    const normalizedLink = portfolio.hero.cvLink || '#';

    if (!isEditing) {
      return (
        <Button
          asChild
          className="bg-[#3390AF] hover:bg-[#2a7a95] text-white px-6 py-6 rounded shadow-lg"
        >
          <a href={normalizedLink} target="_blank" rel="noopener noreferrer">
            <Download className="mr-1 h-5 w-5" />
            <span className="text-white font-semibold">
              {portfolio.hero.cvButton}
            </span>
          </a>
        </Button>
      );
    }

    if (isButtonEditing) {
      return (
        <div className="flex flex-col gap-3 w-full">
          <Input
            value={buttonText}
            onChange={(event) => setButtonText(event.target.value)}
            placeholder="Enter button text"
          />
          <Input
            value={buttonLink}
            onChange={(event) => setButtonLink(event.target.value)}
            placeholder="Enter button link (e.g., https://...)"
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleButtonSave}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleButtonCancel}
              className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="group relative inline-flex items-center">
        <Button className="bg-[#3390AF] hover:bg-[#2a7a95] text-white px-6 py-6 rounded shadow-lg">
          <Download className="mr-1 h-5 w-5" />
          <span className="text-white font-semibold">
            {portfolio.hero.cvButton}
          </span>
        </Button>
        <button
          type="button"
          onClick={() => setIsButtonEditing(true)}
          className="absolute -right-3 -top-3 bg-white border border-[#3390AF]/40 rounded-full p-1 shadow-md"
          aria-label="Edit button text and link"
        >
          <Pencil className="h-4 w-4 text-[#3390AF]" />
        </button>
      </div>
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-white pt-20 pb-20 overflow-hidden mt-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center items-center">
          {/* Central Blue Geometric Shape */}
          <div className="relative w-full max-w-5xl">
            {/* Abstract Blue Background with Vertical Bars */}
            <div className="relative bg-[#5AABC8] rounded-lg overflow-hidden"   style={{ backgroundImage: "url('/hero image background.png')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '600px' }}>
              {/* Left Vertical Bars - Abstract Geometric Design */}
              <div className="absolute left-0 top-0 bottom-0 flex items-end gap-1.5 pl-2">
                <div className="w-2 h-[60%] bg-white/25 rounded-t-md" style={{ transform: 'skewY(-2deg)' }}></div>
                <div className="w-1.5 h-[75%] bg-white/20 rounded-t-md" style={{ transform: 'skewY(1deg)' }}></div>
                <div className="w-3 h-[85%] bg-white/25 rounded-t-md"></div>
                <div className="w-2 h-[50%] bg-white/20 rounded-t-md" style={{ transform: 'skewY(-1deg)' }}></div>
                <div className="w-2.5 h-[70%] bg-white/25 rounded-t-md" style={{ transform: 'skewY(2deg)' }}></div>
                <div className="w-1.5 h-[55%] bg-white/20 rounded-t-md"></div>
              </div>

              {/* Right Vertical Bars - Abstract Geometric Design */}
              <div className="absolute right-0 top-0 bottom-0 flex items-end gap-1.5 pr-2">
                <div className="w-1.5 h-[55%] bg-white/20 rounded-t-md"></div>
                <div className="w-2.5 h-[70%] bg-white/25 rounded-t-md" style={{ transform: 'skewY(-2deg)' }}></div>
                <div className="w-2 h-[50%] bg-white/20 rounded-t-md" style={{ transform: 'skewY(1deg)' }}></div>
                <div className="w-3 h-[85%] bg-white/25 rounded-t-md"></div>
                <div className="w-1.5 h-[75%] bg-white/20 rounded-t-md" style={{ transform: 'skewY(-1deg)' }}></div>
                <div className="w-2 h-[60%] bg-white/25 rounded-t-md" style={{ transform: 'skewY(2deg)' }}></div>
              </div>

              {/* Central Content Area */}
              <div className="relative z-10 flex flex-col items-center justify-center px-8 py-12 text-center">
             

                {/* Person's Image - Centered */}
                <div className="flex items-center gap-4">
                  <div className="relative w-80 h-80 overflow-hidden border-4 border-white/30 ">
                    <ImageUpload
                      ref={imageUploadRef}
                      currentImage={personImage}
                      onUpload={handleImageUpload}
                      alt="Perzi Foleni"
                      className="w-1/2 h-full object-contain mx-auto"
                      showInternalTrigger={false}
                    />
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => imageUploadRef.current?.openFileDialog()}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#3390AF] shadow-lg transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#3390AF]/40"
                      aria-label="Upload image"
                    >
                      <Upload className="h-6 w-6" />
                    </button>
                  )}
                </div>

                {/* Name */}
                <InlineEditable
                  value={portfolio.hero.name}
                  onSave={(value) => handleSave('name', value)}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-center"
                />

                {/* Description - Left Aligned */}
                <div className="max-w-lg w-full bg-white p-4">
                  <InlineEditable
                    value={portfolio.hero.description}
                    onSave={(value) => handleSave('description', value)}
                    as="textarea"
                    className="text-gray-800 text-center leading-relaxed mb-6 "
                    placeholder="Enter description here..."
                  />
                  {/* Download CV Button */}
                  <div className="flex justify-center">{renderDownloadButton()}</div>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

