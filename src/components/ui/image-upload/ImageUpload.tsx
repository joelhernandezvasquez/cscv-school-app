'use client';
import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { ImagePlus, X } from 'lucide-react';
import ErrorMessage from '@/components/ui/error/ErrorMessage';

interface Props {
  name: string;
  label?: string;
}

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const ImageUpload = ({ name, label = 'Course Image' }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyFile = (file: File | null) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a PNG, JPG or WEBP image.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError(null);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !inputRef.current) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputRef.current.files = dataTransfer.files;
    applyFile(file);
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <label htmlFor={name} className="text-[#2E3135] text-base md:text-lg">
        {label} <span className="text-[#A6A8A9] font-normal text-sm">(optional)</span>
      </label>

      <div
        onClick={() => !preview && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative w-full h-48 rounded-2xl border-2 border-dashed overflow-hidden transition-colors
          ${preview ? 'border-transparent cursor-default' : 'cursor-pointer'}
          ${isDragging ? 'border-[#5655D7] bg-[#5655D7]/5' : !preview ? 'border-[#e5e7eb] bg-[#FAFAFA] hover:border-[#5655D7]/60' : ''}
        `}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Course image preview" className="w-full h-full object-cover object-center" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/60 text-white text-sm hover:bg-black/80 transition-colors cursor-pointer"
            >
              Replace
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 px-4 text-center pointer-events-none">
            <ImagePlus className="text-[#A6A8A9]" size={28} />
            <p className="text-[#2E3135] text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-[#A6A8A9] text-xs">PNG, JPG or WEBP, up to {MAX_SIZE_MB}MB</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          id={name}
          name={name}
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleChange}
          className="sr-only"
        />
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default ImageUpload;
