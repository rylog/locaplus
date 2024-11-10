import { FormattedMessage, useIntl } from 'react-intl';

import { Header } from '../../components/Header/Header';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import { TextInput } from '../../components/TextInput/TextInput';
import { LABEL_COLORS } from '../../styles/colors';

export const Contact = () => {
  const intl = useIntl();
  return (
    <section id="contact" className="h-full bg-slate-900">
      <div className="px-6 py-8 sm:py-28 lg:px-8 bg-slate-900">
        <div className="text-center">
          <Header>
            <FormattedMessage id="requestQuote.title" />
          </Header>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-8 max-w-xl sm:mt-20"
        >
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

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <FormattedMessage id="form.submitButton" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
