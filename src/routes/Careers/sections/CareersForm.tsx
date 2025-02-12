'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

import { useSendQuoteRequest } from '@/api/useSendCVRequest';
import FileUploader from '@/components/FileUploader/FileUploader';
import { TextInput } from '@/components/Form/TextInput/TextInput';
import PrivacyPolicyModal from '@/components/PrivacyModal/PrivacyModal';
import { LABEL_COLORS } from '@/styles/colors';

interface CareersFormInputs {
  firstName: '';
  lastName: '';
  email: string;
  phoneNumber: string;
  documents: File[];
}

export const CareersForm = () => {
  const [error, setError] = useState('');
  const [reCaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sendQuoteMutation = useSendQuoteRequest();
  const locale = useLocale();

  const t = useTranslations('Form');

  const { register, control, formState, handleSubmit } =
    useForm<CareersFormInputs>({
      mode: 'onSubmit',
    });

  const onSubmit = (data: CareersFormInputs): Promise<void> => {
    return new Promise(async (resolve, reject) => {});
  };

  const { errors, isSubmitting } = formState;

  return (
    <>
      <Toaster />
      <div className="mt-4 rounded-md shadow-md ring-1 ring-black/5 p-10 bg-white">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          {t('applyNow')}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-8 max-w-xl"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <TextInput
              {...register('firstName', {
                required: t('error.firstName.required'),
              })}
              required
              autoComplete="given-name"
              label={t('firstName')}
              labelColor={LABEL_COLORS.CAREERS_FORM}
              errors={errors}
            />
            <TextInput
              {...register('lastName', {
                required: t('error.lastName.required'),
              })}
              required
              name="lastName"
              autoComplete="family-name"
              label={t('lastName')}
              labelColor={LABEL_COLORS.CAREERS_FORM}
              errors={errors}
            />
            <TextInput
              {...register('email', {
                required: t('error.email.required'),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('error.email.invalid'),
                },
              })}
              required
              className={'sm:col-span-2'}
              autoComplete="email"
              label={t('email')}
              labelColor={LABEL_COLORS.CAREERS_FORM}
              errors={errors}
            />
            <TextInput
              {...register('phoneNumber', {
                required: t('error.phoneNumber.required'),
              })}
              required
              className={'sm:col-span-2'}
              autoComplete="tel"
              label={t('phoneNumber')}
              labelColor={LABEL_COLORS.CAREERS_FORM}
              errors={errors}
            />

            <div className={'sm:col-span-2'}>
              <Controller
                control={control}
                name="documents"
                render={({ field: { onChange } }) => (
                  <>
                    <label
                      htmlFor="documents"
                      className={clsx('block text-sm/6 font-semibold mb-2')}
                    >
                      {t('documents')} <span className="text-red-500">*</span>
                    </label>
                    <FileUploader onFilesChange={(e) => onChange(e)} />
                  </>
                )}
              ></Controller>
            </div>
          </div>

          {errors && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-8">
            <ReCAPTCHA
              key={locale}
              hl={locale}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(val) => setRecaptchaToken(val)}
            />
          </div>
          <div className="mt-10 w-fit justify-self-end">
            <button
              type="submit"
              disabled={!reCaptchaToken}
              className={clsx(
                'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs',
                {
                  'bg-gray-500': isSubmitting,
                  'bg-primary': !isSubmitting,
                  'disabled:bg-gray-800 disabled:text-neutral-500 disabled:cursor-not-allowed':
                    true,
                },
              )}
            >
              {isSubmitting ? t('sending') : t('submitButton')}
            </button>
          </div>
        </form>
      </div>
      <PrivacyPolicyModal
        open={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </>
  );
};
