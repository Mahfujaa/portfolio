'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPortfolio, setLoading } from '@/store/portfolioSlice';
import { fetchPortfolio } from '@/lib/services/portfolioService';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Statistics } from '@/components/sections/Statistics';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Experience } from '@/components/sections/Experience';
import { Expertise } from '@/components/sections/Expertise';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/sections/Footer';
import { AdminToggle } from '@/components/AdminToggle';

export default function Home() {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.data);
  const isLoading = useAppSelector((state) => state.portfolio.isLoading);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchPortfolio();
        dispatch(setPortfolio(data));
      } catch (error) {
        console.error('Error loading portfolio:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadPortfolio();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3390AF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <AdminToggle />
      <Header />
      <Hero />
      <Statistics />
      <About />
      <Services />
      <Experience />
      <Expertise />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
