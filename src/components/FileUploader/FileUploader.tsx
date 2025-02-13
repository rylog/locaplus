import { useTranslations } from 'next-intl';
import { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  base64: string; // Converted file content
}

const MAX_FILE_SIZE_MB = 5; // Limit file size to 5MB

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

    const allowedTypes = [
      'application/pdf', // PDF
      'application/msword', // .doc (older Word format)
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    ];

    setLoading(true); // Start loading when file processing begins

    Array.from(fileList).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: ${t('error.invalidFileType')}`);
      } else if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name}: ${t('error.fileTooLarge')}`);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result?.toString().split(',')[1]; // Remove data URL prefix
          if (base64String) {
            validFiles.push({
              id: crypto.randomUUID(),
              name: file.name,
              type: file.type,
              base64: base64String,
            });

            // Update state and notify parent when all files are processed
            if (validFiles.length > 0) {
              setUploadedFiles((prev) => [...prev, ...validFiles]);
              onFilesChange([...uploadedFiles, ...validFiles]);
            }
          }
        };
      }
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    }

    setLoading(false); // Stop loading after processing
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
        {/* The label triggers the input */}
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

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4 text-center text-blue-500">
          <span>{t('uploadingFiles')}</span> {/* You can customize this text */}
        </div>
      )}

      {/* File List */}
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
