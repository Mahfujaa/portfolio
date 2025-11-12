import axios from 'axios';
import type { PortfolioDocument } from '@/models/Portfolio';

const API_BASE = '/api/portfolio';

export const fetchPortfolio = async (): Promise<PortfolioDocument> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const updatePortfolio = async (data: Partial<PortfolioDocument>): Promise<PortfolioDocument> => {
  const response = await axios.put(API_BASE, data);
  return response.data;
};

export const updateSection = async (section: string, data: any): Promise<PortfolioDocument> => {
  const response = await axios.put(`${API_BASE}/section`, { section, data });
  return response.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.url;
};


