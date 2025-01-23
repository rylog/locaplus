import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import clsx from 'clsx';
import { Ref } from 'react';

interface TextInputProps {
  ref?: Ref<HTMLInputElement>;
  className?: string;
  name: string;
  autoComplete?: string;
  label: string;
  labelColor: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors?: FieldErrors;
  required?: boolean;
}

export const TextInput = ({
  ref,
  className,
  name,
  autoComplete,
  label,
  labelColor,
  onChange,
  onBlur,
  errors,
  required = false,
}: TextInputProps) => {
  const hasError = !!errors?.[name];

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={clsx(labelColor, 'block text-sm/6 font-semibold')}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2.5">
        <input
          ref={ref}
          id={name}
          className={clsx(
            'block w-full rounded-md border px-3.5 py-2 bg-white text-gray-900 shadow-xs placeholder:text-gray-900 focus:outline-hidden sm:text-sm/6',
            {
              'border-2 border-b-red-500': hasError,
              'shadow-none border-gray-300': !hasError,
            },
          )}
          name={name}
          type="text"
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-red-500 mt-1">{message}</p>
          )}
        />
      )}
    </div>
  );
};
