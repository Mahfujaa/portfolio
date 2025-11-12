'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleEditing } from '@/store/portfolioSlice';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export const AdminToggle = () => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.portfolio.isEditing);

  return (
    <Button
      onClick={() => dispatch(toggleEditing())}
      variant={isEditing ? 'default' : 'outline'}
      className="fixed top-4 right-4 z-50"
    >
      <Edit className="h-4 w-4 mr-2" />
      {isEditing ? 'Exit Edit' : 'Edit Mode'}
    </Button>
  );
};


