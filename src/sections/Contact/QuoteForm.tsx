import clsx from 'clsx';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router';

import { useSendQuoteRequest } from '../../api/useSendQuoteRequest';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import PrivacyPolicyModal from '../../components/PrivacyModal/PrivacyModal';
import { TextInput } from '../../components/TextInput/TextInput';
import { SECTIONS } from '../../constants/sections';
import { Locale } from '../../context/LocaleContext';
import { LABEL_COLORS } from '../../styles/colors';

export interface QuoteFormInputs {
  firstName: string;
  lastName: string;
  eventType: string;
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
  const sendQuoteMutation = useSendQuoteRequest();
  const { locale } = useParams<{ locale: Locale }>();

  const { register, formState, handleSubmit } = useForm<QuoteFormInputs>({
    mode: 'onSubmit',
  });

  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = (data: QuoteFormInputs): Promise<void> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        await sendQuoteMutation.mutateAsync({
          recipient: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          eventType: data.eventType,
          phoneNumber: data.phoneNumber,
          message: data.message,
          language: locale?.toString(),
          reCaptchaToken: reCaptchaToken!,
        });
        resolve();
      } catch (error) {
        console.error(error);
        setError(intl.formatMessage({ id: 'error.sendEmail.generic' }));
        reject(error);
      }
    });
  };

  return (
    <section id={SECTIONS.QUOTE} className="p-8 lg:px-12 bg-slate-900">
      <header>
        <h1 className="text-2xl text-white font-semibold tracking-loose sm:text-2xl text-center lg:text-start">
          <FormattedMessage id="requestQuote.title" />
        </h1>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-8 max-w-xl "
      >
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
            className={'sm:col-span-2'}
            label={intl.formatMessage({ id: 'form.typeOfEvent' })}
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

          <div className="mt-4 text-sm text-gray-400 sm:col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('consent', {
                  required: true,
                })}
                className="mr-2 h-4 w-4 text-primary border-gray-300 rounded"
              />
              <span>
                <FormattedMessage id={'privacyPolicy.checkbox.text'} />{' '}
                <button
                  type="button"
                  className="text-white underline"
                  onClick={() => setShowPrivacyModal(true)}
                >
                  <FormattedMessage id={'privacyPolicy.checkbox.link'} />
                </button>
                <span className="text-red-500"> *</span>
              </span>
            </label>
            {errors.consent && (
              <p className="mt-2 text-sm text-red-500">
                {errors.consent.message}
              </p>
            )}
          </div>
        </div>

        {errors && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-8">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
            onChange={(val) => setRecaptchaToken(val)}
          />
        </div>
        <div className="mt-10 w-fit justify-self-end">
          <button
            type="submit"
            disabled={!reCaptchaToken || !isValid}
            className={clsx(
              'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm',
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
