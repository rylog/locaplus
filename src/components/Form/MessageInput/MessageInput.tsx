import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { Ref } from 'react';
import { FieldErrors } from 'react-hook-form';

interface MessageInputProps {
  ref?: Ref<HTMLTextAreaElement>;
  className?: string;
  name: string;
  label: string;
  labelColor: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  errors: FieldErrors;
}

export const MessageInput = ({
  ref,
  className,
  name,
  label,
  labelColor,
  onChange,
  onBlur,
  errors,
}: MessageInputProps) => {
  const hasError = !!errors?.[name];
  return (
    <div className={className}>
      <label htmlFor={name} className={`${labelColor} text-sm/6 font-semibold`}>
        {label}
      </label>
      <div className="mt-2.5">
        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={4}
          className={clsx(
            'block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-900 focus:outline-none sm:text-sm/6',
            {
              'border-2 border-b-red-500': hasError,
              'shadow-none border-gray-300': !hasError,
            },
          )}
          defaultValue={''}
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
