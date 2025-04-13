import React, { useRef } from 'react';

interface Props {
  onSubmit: (file: File) => void;
}

export const FileUploader: React.FC<Props> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = () => {
    const input = inputRef.current;
    if (!input || !input.files || input.files.length === 0) return;
  
    const file = input.files[0];
  
    const isValidType = ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type);
    if (!isValidType) return alert('Only PDF or image files allowed.');
  
    if (file.size > 2 * 1024 * 1024) return alert('File must be < 2MB');
  
    onSubmit(file);
    input.value = ''; // reset input
  };

  return (
    <div className="p-4">
      <input ref={inputRef} type="file" accept=".pdf,image/*" onChange={handleFileChange} />
    </div>
  );
};
