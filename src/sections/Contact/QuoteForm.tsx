'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { useLocale } from '@/context/LocaleContext';
import { LABEL_COLORS } from '@/styles/colors';

import { useSendQuoteRequest } from '../../api/useSendQuoteRequest';
import { ConsentCheckbox } from '../../components/Form/ConsentCheckbox/ConsentCheckbox';
import { ControlledDateInput } from '../../components/Form/ControlledDateInput/ControlledDateInput';
import { MessageInput } from '../../components/Form/MessageInput/MessageInput';
import { TextInput } from '../../components/Form/TextInput/TextInput';
import PrivacyPolicyModal from '../../components/PrivacyModal/PrivacyModal';
import { SECTIONS } from '../../constants/sections';

export interface QuoteFormInputs {
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: string;
  location: string;
  email: string;
  phoneNumber: string;
  message: string;
  consent: boolean;
}

const QuoteForm = () => {
  const intl = useIntl();
  const [error, setError] = useState('');
  const [reCaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sendQuoteMutation = useSendQuoteRequest();
  const { locale } = useLocale();

  const { register, control, formState, handleSubmit } =
    useForm<QuoteFormInputs>({
      mode: 'onSubmit',
    });

  const { errors, isSubmitting } = formState;

  const onSubmit = (data: QuoteFormInputs): Promise<void> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        await sendQuoteMutation.mutateAsync({
          recipient: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          eventType: data.eventType,
          eventDate: format(
            data.eventDate,
            locale == 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy',
          ),
          location: data.location,
          phoneNumber: data.phoneNumber,
          message: data.message,
          language: locale?.toString(),
          reCaptchaToken: reCaptchaToken!,
        });
        setFormSubmitted(true);
        resolve();
      } catch (error) {
        setError(intl.formatMessage({ id: 'error.sendEmail.generic' }));
        reject(error);
      }
    });
  };

  if (formSubmitted) {
    return (
      <section
        id={SECTIONS.QUOTE}
        className="p-8 lg:px-12 bg-slate-900 flex items-center justify-center"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl text-white font-semibold tracking-loose sm:text-2xl text-center">
            <FormattedMessage id="requestQuote.success.title" />
          </h1>
          <CheckCircleIcon className="w-24 h-24 text-white m-auto" />
          <p className="text-white text-center">
            <FormattedMessage id="requestQuote.success.message" />
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={SECTIONS.QUOTE} className="p-8 lg:px-12 bg-slate-900">
      <header>
        <h1 className="text-2xl text-white font-semibold tracking-loose sm:text-2xl text-center lg:text-start">
          <FormattedMessage id="requestQuote.title" />
        </h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <TextInput
            {...register('firstName', {
              required: intl.formatMessage({
                id: 'error.firstName.required',
              }),
            })}
            required
            autoComplete="given-name"
            label={intl.formatMessage({ id: 'form.firstName' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />
          <TextInput
            {...register('lastName', {
              required: intl.formatMessage({ id: 'error.lastName.required' }),
            })}
            required
            name="lastName"
            autoComplete="family-name"
            label={intl.formatMessage({ id: 'form.lastName' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />
          <TextInput
            {...register('eventType', {
              required: intl.formatMessage({ id: 'error.eventType.required' }),
            })}
            required
            label={intl.formatMessage({ id: 'form.typeOfEvent' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />
          <ControlledDateInput
            required
            control={control}
            name="eventDate"
            label={intl.formatMessage({ id: 'form.eventDate' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />
          <TextInput
            {...register('location', {
              required: intl.formatMessage({
                id: 'error.location.required',
              }),
            })}
            required
            className={'sm:col-span-2'}
            label={intl.formatMessage({ id: 'form.location' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />
          <TextInput
            {...register('email', {
              required: intl.formatMessage({ id: 'error.email.required' }),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: intl.formatMessage({ id: 'error.email.invalid' }),
              },
            })}
            required
            className={'sm:col-span-2'}
            autoComplete="email"
            label={intl.formatMessage({ id: 'form.email' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />
          <TextInput
            {...register('phoneNumber', {
              required: intl.formatMessage({
                id: 'error.phoneNumber.required',
              }),
            })}
            required
            className={'sm:col-span-2'}
            autoComplete="tel"
            label={intl.formatMessage({ id: 'form.phoneNumber' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />
          <MessageInput
            {...register('message')}
            className={'sm:col-span-2'}
            name={'message'}
            label={intl.formatMessage({ id: 'form.message' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
            errors={errors}
          />

          <ConsentCheckbox
            {...register('consent', {
              validate: {
                isChecked: (value: boolean) =>
                  value ||
                  intl.formatMessage({
                    id: 'error.consentCheckbox.isChecked',
                  }),
              },
            })}
            name={'consent'}
            errors={errors}
            className="mt-4 text-sm text-gray-400 sm:col-span-2"
          />
        </div>

        {errors && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-8">
          <ReCAPTCHA
            key={locale}
            hl={locale}
            sitekey={'6LfHlqYqAAAAADot6hAgFU__aVE81y3ArPycGnoA'}
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
            {isSubmitting ? (
              intl.formatMessage({ id: 'form.sending' })
            ) : (
              <FormattedMessage id="form.submitButton" />
            )}
          </button>
        </div>
      </form>
      <PrivacyPolicyModal
        open={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </section>
  );
};

export default QuoteForm;
