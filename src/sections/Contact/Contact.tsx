import { FormattedMessage } from 'react-intl';

import { SECTIONS } from '../../constants/sections';
import ContactInfo from './ContactInfo';
import QuoteForm from './QuoteForm';

export const Contact = () => {
  return (
    <section id={SECTIONS.CONTACT} className="h-full py-12 sm:py-16">
      <div className="flex flex-col max-w-2xl px-6 lg:max-w-6xl justify-self-center gap-4">
        <header>
          <h1 className="text-lg/7 font-semibold text-primary text-center">
            <FormattedMessage id="nav.contactUs" />
          </h1>
          <h2 className="mx-auto mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl text-center">
            <FormattedMessage id="contact.title" />
          </h2>
          <p className="text-center mt-2 text-gray-600">
            <FormattedMessage id="contact.description" />
          </p>
        </header>
      </div>
      <div className="flex py-12 justify-center">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-2xl mx-6 lg:max-w-7xl lg:mx-8 rounded-2xl bg-white overflow-hidden">
          <ContactInfo />
          <QuoteForm />
        </div>
      </div>
    </section>
  );
};
