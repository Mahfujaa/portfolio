'use client';

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useAppSelector } from '@/store/hooks';
import { uploadImage } from '@/lib/services/portfolioService';
import { Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';

export type ImageUploadHandle = {
  openFileDialog: () => void;
};

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (url: string) => void;
  alt?: string;
  className?: string;
  showInternalTrigger?: boolean;
}

export const ImageUpload = forwardRef<ImageUploadHandle, ImageUploadProps>(
  (
    {
      currentImage,
      onUpload,
      alt = '',
      className = '',
      showInternalTrigger = true,
    },
    ref
  ) => {
    const isEditing = useAppSelector((state) => state.portfolio.isEditing);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
      fileInputRef.current?.click();
    };

    useImperativeHandle(ref, () => ({
      openFileDialog,
    }));

    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      try {
        const url = await uploadImage(file);
        onUpload(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    };

    if (!isEditing) {
      return currentImage ? (
        <div className={`relative ${className}`}>
          <Image
            src={currentImage}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className={`bg-gray-200 ${className}`} />
      );
    }

    return (
      <div className={`relative group ${className}`}>
        {currentImage && (
          <Image
            src={currentImage}
            alt={alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {showInternalTrigger && (
          <button
            type="button"
            onClick={openFileDialog}
            className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#3390AF] shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#3390AF]/40 disabled:opacity-70"
            disabled={uploading}
            aria-label="Upload image"
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </button>
        )}
        {!currentImage && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <Upload className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';
