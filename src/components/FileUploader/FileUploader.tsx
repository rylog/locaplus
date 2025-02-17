'use client';

import { useTranslations } from 'next-intl';
import { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

import { UploadedFile } from '@/types/UploadedFile';

const MAX_FILE_SIZE_MB = 3; // Limit file size to 3MB per file
const MAX_TOTAL_SIZE_MB = 10; // Limit total file size to 10MB
const MAX_FILE_COUNT = 3; // Limit to 3 files

const FileUploader = ({
  onFilesChange,
}: {
  onFilesChange: (files: UploadedFile[]) => void;
}) => {
  const t = useTranslations('Form');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    processFiles(event.dataTransfer.files);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processFiles(event.target.files);
    }
  };

  const processFiles = (fileList: FileList) => {
    const validFiles: UploadedFile[] = [];
    const errors: string[] = [];
    let totalSize = 0;

    const allowedTypes = [
      'application/pdf', // PDF
      'application/msword', // .doc (older Word format)
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    ];

    setLoading(true); // Start loading when file processing begins

    // Check if the number of files exceeds the maximum limit
    if (uploadedFiles.length + fileList.length > MAX_FILE_COUNT) {
      errors.push(t('error.documents.tooManyFiles'));
    }

    // Validate file types and size, and accumulate valid files
    Array.from(fileList).forEach((file) => {
      totalSize += file.size / 1024 / 1024; // Size in MB

      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: ${t('error.documents.invalidFileType')}`);
      } else if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name}: ${t('error.documents.fileTooLarge')}`);
      }
    });

    // Check if total file size exceeds the limit
    if (totalSize > MAX_TOTAL_SIZE_MB) {
      errors.push(t('error.documents.tooLargeTotalSize'));
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      setLoading(false);
      return;
    }

    // Process files once validation is complete
    const filePromises = Array.from(fileList).map((file) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result?.toString().split(',')[1];
          if (base64String) {
            validFiles.push({
              id: crypto.randomUUID(),
              name: file.name,
              type: file.type,
              base64: base64String,
            });
          }
          resolve();
        };
      });
    });

    // Once all files have been processed, update the state
    Promise.all(filePromises).then(() => {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      onFilesChange([...uploadedFiles, ...validFiles]);
      setLoading(false);
    });
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== id);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div>
      {/* Drag & Drop Area */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-all duration-200"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="block text-gray-700 cursor-pointer h-30 content-center"
        >
          {t('dragAndDropOr')}{' '}
          <span className="text-blue-600 font-medium hover:underline">
            {t('browse')}
          </span>
        </label>
      </div>

      <div className="text-sm text-gray-600 mt-4">
        <p>
          {t('supportedFileTypes')} <strong>PDF, DOC, DOCX</strong>
        </p>
        <p>
          {t('maxFileSize')} <strong>{MAX_FILE_SIZE_MB}MB</strong>
        </p>
      </div>

      {loading && (
        <div className="mt-4 text-center text-blue-500">
          <span>{t('uploadingFiles')}</span>
        </div>
      )}

      {uploadedFiles.length > 0 && !loading && (
        <ul className="mt-4 space-y-3">
          {uploadedFiles.map(({ id, name }) => (
            <li
              key={id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <span className="text-sm font-medium">{name}</span>
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
