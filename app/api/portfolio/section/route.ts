import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { updateInMemorySection } from '@/lib/portfolioFallback';

export const PUT = async (request: NextRequest) => {
  try {
    const dbConnection = await connectDB();
    
    const { section, data } = await request.json();

    if (!dbConnection) {
      const updated = updateInMemorySection(section, data);
      return NextResponse.json(updated);
    }

    let portfolio = await Portfolio.findOne();

    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    (portfolio as any)[section] = data;
    await portfolio.save();

    const portfolioObj = portfolio.toObject ? portfolio.toObject() : portfolio;
    return NextResponse.json(portfolioObj);
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
};

