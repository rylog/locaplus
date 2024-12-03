import { FormattedMessage, useIntl } from 'react-intl';

import AboutLeftSectionPhoto from '/assets/about/leftSection.jpg';
import AboutMiddleSectionPhoto from '/assets/about/middleSection.jpg';
import AboutRightSectionPhoto from '/assets/about/rightSection.jpg';

import { SECTIONS } from '../../constants/sections';

export const About = () => {
  const intl = useIntl();

  return (
    <section id={SECTIONS.ABOUT} className="bg-linear py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <header>
          <h1 className="text-center text-lg/7 font-semibold text-primary">
            <FormattedMessage id="nav.aboutUs" />
          </h1>
          <h2 className="mx-auto mt-2 max-w-2xl text-balance text-3xl font-semibold text-gray-950 sm:text-4xl text-center">
            <FormattedMessage id="about.title" />
          </h2>
        </header>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-1">
          {/* Left */}
          <div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5">
            <img
              className="h-96 w-full object-cover object-top"
              src={AboutLeftSectionPhoto}
              alt={intl.formatMessage({ id: 'about.section1.title' })}
            />
            <div className="p-8 sm:px-10">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                <FormattedMessage id="about.section1.title" />
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                <FormattedMessage id="about.section1.description" />
              </p>
            </div>
          </div>

          {/* Middle */}
          <div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5">
            <img
              className="h-96 w-full object-cover"
              src={AboutMiddleSectionPhoto}
              alt={intl.formatMessage({ id: 'about.section2.title' })}
            />
            <div className="p-8">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                <FormattedMessage id="about.section2.title" />
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                <FormattedMessage id="about.section2.description" />
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5">
            <img
              className="h-96 w-full object-cover"
              src={AboutRightSectionPhoto}
              alt={intl.formatMessage({ id: 'about.section3.title' })}
            />
            <div className="p-8">
              <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                <FormattedMessage id="about.section3.title" />
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                <FormattedMessage id="about.section3.description" />
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col overflow-hidden rounded-lg items-center lg:rounded-b-[calc(2rem+1px)]">
          <div className="flex flex-col px-8 pb-3 pt-8 sm:px-10 sm:pb-8 sm:pt-10 items-center">
            <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
              <FormattedMessage id="about.section4.title" />
            </h2>
            <p className="mt-2 text-sm/6 text-gray-600 max-lg:text-center">
              <FormattedMessage id="about.section4.description" />
            </p>
            <img src="/assets/about/tempo.png" className="h-12 mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
};
