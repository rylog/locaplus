import { useTranslations } from 'next-intl';
import { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

interface UploadedFile {
  id: string;
  file: File;
}

const MAX_FILE_SIZE_MB = 5; // Limit file size to 5MB

const FileUploader = ({
  onFilesChange,
}: {
  onFilesChange: (files: File[]) => void;
}) => {
  const t = useTranslations('Form');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }
  };

  const addFiles = (fileList: FileList) => {
    const validFiles: UploadedFile[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.type !== 'application/pdf' || !file.name.endsWith('.pdf')) {
        errors.push(`${file.name}: ${t('error.invalidFileType')}`);
      } else if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name}: ${t('error.fileTooLarge')}`);
      } else {
        validFiles.push({ id: crypto.randomUUID(), file });
      }
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      onFilesChange([
        ...uploadedFiles.map((f) => f.file),
        ...validFiles.map((f) => f.file),
      ]);
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== id);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles.map((f) => f.file));
  };

  return (
    <div>
      {/* Drag & Drop Area */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 transition-all duration-200"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="block text-gray-700 cursor-pointer"
        >
          {t('dragAndDropOr')}{' '}
          <span className="text-blue-600 font-medium hover:underline">
            {t('browse')}
          </span>
        </label>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <ul className="mt-4 space-y-3">
          {uploadedFiles.map(({ id, file }) => (
            <li
              key={id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <span className="text-sm font-medium">{file.name}</span>
              <button
                onClick={() => removeFile(id)}
                className="text-red-500 hover:text-red-700 text-sm font-bold"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
