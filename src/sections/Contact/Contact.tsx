import { FormattedMessage, useIntl } from 'react-intl';

import { MessageInput } from '../../components/MessageInput/MessageInput';
import { TextInput } from '../../components/TextInput/TextInput';
import { LABEL_COLORS } from '../../styles/colors';

export const Contact = () => {
  const intl = useIntl();
  return (
    <section id="Contact" className="isolate h-full bg-slate-900">
      <div className="isolate bg-slate-900 px-6 py-8 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-medium tracking-tight text-slate-100 sm:text-6xl">
            <FormattedMessage id="contactUs" />
          </h1>
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
              label={intl.formatMessage({ id: 'formFirstName' })}
              labelColor={LABEL_COLORS.CONTACT_FORM}
            />
            <TextInput
              name="lastName"
              autoComplete="family-name"
              label={intl.formatMessage({ id: 'formLastName' })}
              labelColor={LABEL_COLORS.CONTACT_FORM}
            />
            <TextInput
              className={'sm:col-span-2'}
              name="eventType"
              label={intl.formatMessage({ id: 'formTypeOfEvent' })}
              labelColor={LABEL_COLORS.CONTACT_FORM}
            />

            <TextInput
              className={'sm:col-span-2'}
              name="email"
              autoComplete="email"
              label={intl.formatMessage({ id: 'formEmail' })}
              labelColor={LABEL_COLORS.CONTACT_FORM}
            />

            <TextInput
              className={'sm:col-span-2'}
              name="phoneNumber"
              autoComplete="tel"
              label={intl.formatMessage({ id: 'formPhoneNumber' })}
              labelColor={LABEL_COLORS.CONTACT_FORM}
            />
            <MessageInput
              className={'sm:col-span-2'}
              name={'message'}
              label={intl.formatMessage({ id: 'formMessage' })}
              labelColor={LABEL_COLORS.CONTACT_FORM}
            />
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <FormattedMessage id="formSubmitButton" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
