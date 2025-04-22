import { ErrorMessage } from '@hookform/error-message';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { enUS, frFR } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import clsx from 'clsx';
import { isValid } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValue,
  FieldValues,
  Path,
} from 'react-hook-form';

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
  const locale = useLocale();
  const t = useTranslations('Form');
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
              required: required ? t('error.eventDate.required') : false,
              validate: {
                isValid: (value: string) =>
                  isValid(value) || t('error.dateInput.isValid'),
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
                    size: 'small',
                    className: clsx(
                      'h-[42px] block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-xs placeholder:text-gray-900 focus:outline-hidden sm:text-sm/6 bg-white',
                      {
                        'border-2 border-red-500': hasError,
                        'border-gray-300': !hasError,
                      },
                    ),
                    sx: {
                      '> .MuiPickersOutlinedInput-root': {
                        height: 42, // whatever height you want here
                      },
                    },
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
