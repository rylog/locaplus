import { ErrorMessage } from '@hookform/error-message';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { enUS } from '@mui/x-date-pickers/locales/enUS';
import { frFR } from '@mui/x-date-pickers/locales/frFR';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import clsx from 'clsx';
import { isValid } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValue,
  FieldValues,
  Path,
} from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useLocale } from '@/context/LocaleContext';

interface DateInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  labelColor: string;
  defaultValue?: FieldValue<T>;
  errors?: FieldErrors;
  required?: boolean;
  className?: string;
}

export const ControlledDateInput = <T extends FieldValues>({
  control,
  name,
  label,
  labelColor,
  defaultValue = new Date() as FieldValue<T>,
  errors,
  required = false,
  className,
}: DateInputProps<T>) => {
  const { locale } = useLocale();
  const intl = useIntl();
  const hasError = !!errors?.[name];

  return (
    <div className={className}>
      <label
        htmlFor={name as string}
        className={clsx(labelColor, 'block text-sm/6 font-semibold')}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2.5">
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={
            {
              en: undefined, // Default locale for `AdapterDateFns`
              fr: fr,
            }[locale]
          }
        >
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
              required: required
                ? intl.formatMessage({ id: 'error.eventDate.required' })
                : false,
              validate: {
                isValid: (value: string) =>
                  isValid(value) ||
                  intl.formatMessage({
                    id: 'error.dateInput.isValid',
                  }),
              },
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value}
                onChange={(date) => {
                  field.onChange(date);
                }}
                disablePast
                sx={{
                  '& .MuiInputBase-root': { height: 42 },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid transparent', // Remove the default border
                    transition: 'none', // Remove transition effects
                  },
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid transparent', // Remove hover border effect
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid transparent', // Remove focus border effect
                    },
                  },
                }}
                localeText={
                  {
                    en: enUS.components.MuiLocalizationProvider.defaultProps
                      .localeText,
                    fr: frFR.components.MuiLocalizationProvider.defaultProps
                      .localeText,
                  }[locale]
                }
                slotProps={{
                  textField: {
                    className: clsx(
                      'h-[42px] block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-xs placeholder:text-gray-900 focus:outline-hidden sm:text-sm/6 bg-white',
                      {
                        'border-2 border-red-500': hasError,
                        'border-gray-300': !hasError,
                      },
                    ),
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
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
