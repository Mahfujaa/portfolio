'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Pencil, Check, X } from 'lucide-react';

interface InlineEditableProps {
  value: string;
  onSave: (value: string) => void;
  as?: 'input' | 'textarea' | 'div';
  className?: string;
  placeholder?: string;
  displayValue?: string;
}

export const InlineEditable = ({
  value,
  onSave,
  as = 'input',
  className = '',
  placeholder = '',
  displayValue,
}: InlineEditableProps) => {
  const isEditing = useAppSelector((state) => state.portfolio.isEditing);
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isLocalEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLocalEditing]);

  const handleSave = () => {
    onSave(editValue);
    setIsLocalEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsLocalEditing(false);
  };

  if (!isEditing) {
    return <div className={className}>{displayValue ?? value ?? placeholder}</div>;
  }

  if (isLocalEditing) {
    const InputComponent = as === 'textarea' ? Textarea : Input;
    return (
      <div className="flex items-start gap-2 w-full">
        <InputComponent
          ref={inputRef as any}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={`flex-1 ${className}`}
          placeholder={placeholder}
        />
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button 
            size="sm" 
            onClick={handleSave} 
            variant="default"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={handleCancel} 
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  const isTextarea = as === 'textarea';
  const wrapperClass = isTextarea 
    ? "group relative block w-full" 
    : "group relative inline-flex items-center gap-2 max-w-full";
  const contentClass = isTextarea ? "block" : "";

  return (
    <div className={wrapperClass}>
      <span className={`${className} ${contentClass}`}>
        {displayValue ?? value ?? placeholder}
      </span>
      <button
        onClick={() => setIsLocalEditing(true)}
        className={`opacity-100 transition-opacity flex-shrink-0 p-1 hover:bg-gray-100 rounded ml-1 ${isTextarea ? 'absolute top-0 right-0' : ''}`}
        type="button"
        aria-label="Edit"
      >
        <Pencil className="h-4 w-4 text-[#3390AF]" />
      </button>
    </div>
  );
};


