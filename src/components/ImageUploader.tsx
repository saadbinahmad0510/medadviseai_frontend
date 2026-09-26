'use client';

import { useEffect, useRef, useState } from 'react';

const SAMPLE_FILENAMES = [
  'grade0_0.png', 'grade0_1.png', 'grade0_2.png',
  'grade1_0.png', 'grade1_1.png', 'grade1_2.png',
  'grade2_0.png', 'grade2_1.png', 'grade2_2.png',
  'grade3_0.png', 'grade3_1.png', 'grade3_2.png',
  'grade4_0.png', 'grade4_1.png', 'grade4_2.png',
];

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

interface ImageUploaderProps {
  image: File | null;
  onChange: (file: File | null) => void;
}

export default function ImageUploader({ image, onChange }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function stageFile(file: File | null) {
    if (!file) {
      setError(null);
      onChange(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setError(`Image is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max size is 10MB.`);
      return;
    }
    setError(null);
    onChange(file);
  }

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    stageFile(e.dataTransfer.files?.[0] ?? null);
  }

  async function handleSampleClick(filename: string) {
    const res = await fetch(`/samples/${filename}`);
    const blob = await res.blob();
    stageFile(new File([blob], filename, { type: blob.type || 'image/png' }));
    setShowSamples(false);
  }

  if (image && previewUrl) {
    return (
      <div className="uploader-preview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewUrl} alt="Staged X-ray" />
        <button type="button" className="uploader-remove" onClick={() => onChange(null)}>
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="uploader">
      <div
        className={`uploader-dropzone ${dragOver ? 'uploader-dropzone-active' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <span>Drag an X-ray here, or click to choose a file</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => stageFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {error && <p className="uploader-error">{error}</p>}

      <button type="button" className="uploader-sample-toggle" onClick={() => setShowSamples((v) => !v)}>
        {showSamples ? 'Hide sample X-rays' : 'Or try a sample X-ray'}
      </button>

      {showSamples && (
        <div className="uploader-samples">
          {SAMPLE_FILENAMES.map((filename) => (
            <button
              type="button"
              key={filename}
              className="uploader-sample-thumb"
              onClick={() => handleSampleClick(filename)}
              title={filename}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/samples/${filename}`} alt={filename} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
