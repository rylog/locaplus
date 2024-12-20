import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSendEmail } from '../../api/useSendEmail';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import { TextInput } from '../../components/TextInput/TextInput';
import { SECTIONS } from '../../constants/sections';
import { LABEL_COLORS } from '../../styles/colors';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Locale } from '../../context/LocaleContext';

export interface QuoteFormInputs {
  firstName: string;
  lastName: string;
  eventType: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const QuoteForm = () => {
  const intl = useIntl();
  const [error, setError] = useState('');
  const sendEmailMutation = useSendEmail();
  const { locale } = useParams<{ locale: Locale }>();

  const { register, formState, handleSubmit } = useForm<QuoteFormInputs>({
    mode: 'onSubmit',
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = (data: QuoteFormInputs): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await sendEmailMutation.mutateAsync({
          recipient: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          eventType: data.eventType,
          phoneNumber: data.phoneNumber,
          message: data.message,
          language: locale?.toString(),
        });
        resolve(); // Resolve the promise if the email mutation is successful
      } catch (error) {
        console.error(error);
        setError(intl.formatMessage({ id: 'error.sendEmail.generic' }));
        reject(error); // Reject the promise if an error occurs
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
        </div>
        {errors && <p className="text-red-500 mt-4">{error}</p>}
        <p className={'text-red-500 mt-4'}>
          <FormattedMessage id={'requestQuote.maintenance'} />
        </p>

        <div className="mt-10 w-fit justify-self-end">
          <button
            type="submit"
            disabled={true}
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
    </section>
  );
};

export default QuoteForm;
