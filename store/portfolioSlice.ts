import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PortfolioDocument } from '@/models/Portfolio';

type PortfolioData = Omit<PortfolioDocument, keyof Document>;

interface PortfolioState {
  data: PortfolioData | null;
  isEditing: boolean;
  isLoading: boolean;
}

const initialState: PortfolioState = {
  data: null,
  isEditing: false,
  isLoading: false,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolio: (state, action: PayloadAction<any>) => {
      const payload = action.payload;
      if (payload && typeof payload.toObject === 'function') {
        state.data = payload.toObject();
      } else {
        state.data = payload;
      }
    },
    updateSection: (state, action: PayloadAction<{ section: string; data: any }>) => {
      if (state.data) {
        (state.data as any)[action.payload.section] = action.payload.data;
      }
    },
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setPortfolio, updateSection, toggleEditing, setEditing, setLoading } = portfolioSlice.actions;
export default portfolioSlice.reducer;

