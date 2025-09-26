import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { FieldErrors } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  className?: string;
  name: string;
  label: string;
  labelColor: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  errors?: FieldErrors;
  placeholder?: string;
  required?: boolean;
}

export const SelectInput = ({
  className,
  name,
  label,
  labelColor,
  options,
  value,
  onChange,
  errors,
  required = false,
  placeholder = '-- Select an option --',
}: SelectInputProps) => {
  const hasError = !!errors?.[name];

  return (
    <div className={className}>
      <label htmlFor={name} className={`${labelColor} text-sm/6 font-semibold`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-2.5">
        <Listbox value={value} onChange={onChange}>
          <div className="relative">
            <ListboxButton
              className={clsx(
                'relative w-full cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 sm:text-sm',
                {
                  'border-2 border-red-500': hasError,
                  'border-gray-300': !hasError,
                },
              )}
            >
              <span className="block truncate">
                {value
                  ? options.find((o) => o.value === value)?.label
                  : placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </ListboxButton>

            <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className={({ focus }) =>
                    clsx(
                      'relative cursor-pointer select-none py-2 pl-3 pr-9',
                      focus
                        ? 'bg-slate-100 text-slate-900 rounded-md'
                        : 'text-gray-900',
                    )
                  }
                >
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
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
