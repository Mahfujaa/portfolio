import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { getDefaultPortfolio, getInMemoryPortfolio, overwriteInMemoryPortfolio } from '@/lib/portfolioFallback';

export const GET = async () => {
  try {
    const dbConnection = await connectDB();
    
    if (!dbConnection) {
      return NextResponse.json(getInMemoryPortfolio());
    }

    let portfolio = await Portfolio.findOne();

    if (!portfolio) {
      portfolio = new Portfolio(getDefaultPortfolio());
      await portfolio.save();
    }

    const portfolioObj = portfolio.toObject ? portfolio.toObject() : portfolio;
    return NextResponse.json(portfolioObj);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const dbConnection = await connectDB();
    
    if (!dbConnection) {
      const body = await request.json();
      const updated = overwriteInMemoryPortfolio(body);
      return NextResponse.json(updated);
    }

    const body = await request.json();
    
    let portfolio = await Portfolio.findOne();

    if (!portfolio) {
      portfolio = new Portfolio(body);
    } else {
      portfolio.set(body);
    }

    await portfolio.save();
    const portfolioObj = portfolio.toObject ? portfolio.toObject() : portfolio;
    return NextResponse.json(portfolioObj);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
};

