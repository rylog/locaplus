import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Header } from '../../components/Header/Header';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import { TextInput } from '../../components/TextInput/TextInput';
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
    <div className="py-8 lg:px-12 bg-slate-900 ">
      <div>
        <Header type="tertiary">
          <FormattedMessage id="requestQuote.title" />
        </Header>
      </div>
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

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-10 w-fit justify-self-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${isSubmitting ? 'bg-gray-500' : 'bg-primary'}`}
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <FormattedMessage id="form.submitButton" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
