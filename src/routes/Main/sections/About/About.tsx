import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import AboutLeftSectionPhoto from '@/../public/images/about/leftSection.jpg';
import AboutMiddleSectionPhoto from '@/../public/images/about/middleSection.jpg';
import AboutRightSectionPhoto from '@/../public/images/about/rightSection.jpg';

import { SECTIONS } from '../../../../constants/sections';

export const About = () => {
  const locale = useLocale();
  const t = useTranslations('HomePage');

  return (
    <section id={SECTIONS[locale].ABOUT}>
      <div className="mx-auto max-w-2xl lg:max-w-7xl pt-20 lg:px-8">
        <header>
          <h1 className="text-center text-lg/7 font-semibold text-primary">
            {t('nav.aboutUs')}
          </h1>
          <h2 className="mx-auto mt-2 max-w-2xl text-balance text-3xl font-semibold text-gray-950 sm:text-4xl text-center">
            {t('about.title')}
          </h2>
        </header>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-1">
          {/* Left */}
          <div className="grid grid-rows-[auto_1fr] overflow-hidden lg:rounded-lg bg-white lg:shadow-md ring-1 ring-black/5">
            <Image
              width={1536}
              height={2048}
              className="h-96 w-full object-cover object-top"
              src={AboutLeftSectionPhoto.src}
              alt={t('about.section1.title')}
            />
            <div className="p-8 sm:px-10">
              <p className="lg:mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                {t('about.section1.title')}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                {t('about.section1.description')}
              </p>
            </div>
          </div>

          {/* Middle */}
          <div className="grid grid-rows-[auto_1fr] overflow-hidden lg:rounded-lg bg-white lg:shadow-md ring-1 ring-black/5">
            <Image
              width={2048}
              height={1536}
              className="h-96 w-full object-cover"
              src={AboutMiddleSectionPhoto.src}
              alt={t('about.section2.title')}
            />
            <div className="p-8">
              <p className="lg:mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                {t('about.section2.title')}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                {t('about.section2.description')}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-rows-[auto_1fr] overflow-hidden lg:rounded-lg bg-white lg:shadow-md ring-1 ring-black/5">
            <Image
              width={1024}
              height={768}
              className="h-96 w-full object-cover"
              src={AboutRightSectionPhoto.src}
              alt={t('about.section3.title')}
            />
            <div className="p-8">
              <p className="lg:mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                {t('about.section3.title')}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                {t('about.section3.description')}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col overflow-hidden rounded-lg items-center lg:rounded-b-[calc(2rem+1px)]">
          <div className="flex flex-col px-8 pb-3 pt-8 sm:px-10 sm:pb-8 sm:pt-10 items-center">
            <h2 className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
              {t('about.section4.title')}
            </h2>
            <p className="mt-2 text-sm/6 text-gray-600 max-lg:text-center">
              {t('about.section4.description')}
            </p>
            <Image
              className="h-20 w-auto mt-8"
              width={257}
              height={147}
              src="/images/about/tempo.png"
              alt="Tempo Logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
