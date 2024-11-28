import ClipboardDocumentCheckIcon from '@heroicons/react/24/outline/ClipboardDocumentCheckIcon';
import { FormattedMessage, useIntl } from 'react-intl';

import AboutLeftSectionPhoto from '/assets/about/leftSection.jpg';
import AboutRightSectionPhoto from '/assets/about/rightSection.jpg';

export const About = () => {
  const intl = useIntl();

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-lg/7 font-semibold text-primary">
          <FormattedMessage id="about.title" />
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          <FormattedMessage id="about.heading" />
        </p>
        <div className="h-full lg:max-h-[700px] mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Left */}
          <div className="overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] bg-white shadow ring-1 ring-black/5  lg:row-span-2">
            <div className="flex h-full flex-col ">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-8 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  <FormattedMessage id="about.section1.title" />
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  <FormattedMessage id="about.section1.description" />
                </p>
              </div>
              <div className="min-h-[30rem] w-full grow">
                <img
                  className="size-full object-cover object-top"
                  src={AboutLeftSectionPhoto}
                  alt={intl.formatMessage({ id: 'about.section1.title' })}
                />
              </div>
            </div>
          </div>
          {/* Mid Top */}
          <div className="overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] bg-white shadow ring-1 ring-black/5 max-lg:row-start-1">
            <div className="flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  <FormattedMessage id="about.section2.title" />
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  <FormattedMessage id="about.section2.description" />
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full">
                  <ClipboardDocumentCheckIcon className="text-primary size-8" />
                </div>
              </div>
            </div>
          </div>
          {/* Mid Bottom */}
          <div className="overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] bg-white shadow ring-1 ring-black/5 max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10 pb-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  <FormattedMessage id="about.section3.title" />
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  <FormattedMessage id="about.section3.description" />
                </p>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] bg-white shadow ring-1 ring-black/5 lg:row-span-2">
            <div className="flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-8 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  <FormattedMessage id="about.section4.title" />
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  <FormattedMessage id="about.section4.description" />
                </p>
              </div>
              <div className="min-h-[30rem] w-full grow">
                <img
                  className="size-full object-cover object-top"
                  src={AboutRightSectionPhoto}
                  alt={intl.formatMessage({ id: 'about.section4.title' })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5 items-center lg:rounded-b-[calc(2rem+1px)]">
          <div className="flex flex-col px-8 pb-3 pt-8 sm:px-10 sm:pb-8 sm:pt-10 items-center">
            <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
              <FormattedMessage id="about.section5.title" />
            </h2>
            <p className="mt-2 text-sm/6 text-gray-600 max-lg:text-center">
              <FormattedMessage id="about.section5.description" />
            </p>
            <img src="/about/tempo.png" className="h-12 mt-8"></img>
          </div>
        </div>
      </div>
    </div>
  );
};
