import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { MessageInput } from '../../components/MessageInput/MessageInput';
import { TextInput } from '../../components/TextInput/TextInput';
import { SECTIONS } from '../../constants/sections';
import { LABEL_COLORS } from '../../styles/colors';

const QuoteForm = () => {
  const intl = useIntl();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(event.target as HTMLFormElement);
    const formPayload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      eventType: formData.get('eventType'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        setError('There was an issue sending the email.');
      }
    } catch (error) {
      console.error(error);
      setError('There was an error sending the email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={SECTIONS.QUOTE} className="p-8 lg:px-12 bg-slate-900">
      <header>
        <h1 className="text-2xl text-white font-semibold tracking-loose sm:text-2xl text-center lg:text-start">
          <FormattedMessage id="requestQuote.title" />
        </h1>
      </header>
      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <TextInput
            name="firstName"
            autoComplete="given-name"
            label={intl.formatMessage({ id: 'form.firstName' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
          />
          <TextInput
            name="lastName"
            autoComplete="family-name"
            label={intl.formatMessage({ id: 'form.lastName' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
          />
          <TextInput
            className={'sm:col-span-2'}
            name="eventType"
            label={intl.formatMessage({ id: 'form.typeOfEvent' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
          />
          <TextInput
            className={'sm:col-span-2'}
            name="email"
            autoComplete="email"
            label={intl.formatMessage({ id: 'form.email' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
          />
          <TextInput
            className={'sm:col-span-2'}
            name="phoneNumber"
            autoComplete="tel"
            label={intl.formatMessage({ id: 'form.phoneNumber' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
          />
          <MessageInput
            className={'sm:col-span-2'}
            name={'message'}
            label={intl.formatMessage({ id: 'form.message' })}
            labelColor={LABEL_COLORS.CONTACT_FORM}
          />
        </div>

        <p className="text-red-500 mt-4">
          <FormattedMessage id="requestQuote.maintenance" />
        </p>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-10 w-fit justify-self-end">
          <button
            type="submit"
            disabled={true}
            className={clsx(
              'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm',
              {
                'bg-gray-500': isSubmitting,
                'bg-primary': !isSubmitting,
                'disabled:bg-gray-800 text-neutral-500 disabled:cursor-not-allowed':
                  true,
              },
            )}
          >
            {isSubmitting ? (
              'Sending...'
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
