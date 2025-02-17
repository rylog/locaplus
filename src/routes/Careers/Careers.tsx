'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Logo from '@/../public/Logo_locaplus.png';
import { LanguageSelector } from '@/components/NavBar/LanguageSelector';
import { Link } from '@/i18n/routing';

import { CareersForm } from './sections/CareersForm';

export const Careers = () => {
  const t = useTranslations('Careers');
  return (
    <div className="flex flex-col bg-gray-100 h-full">
      <header>
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-3 lg:px-8 bg-white"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 content-center"
              aria-label="Go to the home page"
            >
              <ArrowLeftIcon className="w-7 h-7 mr-7 " />
            </Link>
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              aria-label="Go to the home page"
            >
              <Image
                width={191}
                height={100}
                alt="Locaplus Logo"
                src={Logo.src}
                className="h-14 w-auto"
              />
            </Link>
            <h1 className="font-sans font-extralight text-xl content-end ml-4 mb-[-4px]">
              {t('title')}
            </h1>
          </div>
          <div className="flex lg:hidden"></div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <LanguageSelector />
          </div>
        </nav>
      </header>
      <div className="max-w-6xl mx-auto md:p-8 flex flex-col flex-1 w-full">
        <div className="max-w-6xl mt-8">
          <div className="flex rounded-lg flex-col md:flex-row text-center md:text-left gap-4">
            <div className="md:w-1/2 rounded-md ring-1 ring-black/5 p-10 flex flex-col justify-between bg-white">
              <h1 className="text-4xl font-bold mb-4">
                {t('joinOurTeam.title')}
              </h1>
              <p>{t('joinOurTeam.description')}</p>
              <h2 className="font-bold text-lg mt-8">
                {t('joinOurTeam.whatWeOffer.title')}
              </h2>
              <ul className="mt-4 space-y-4 text-gray-800">
                <li className="items-center">
                  <span>{t('joinOurTeam.whatWeOffer.competitiveSalary')}</span>
                </li>
                <li className="items-center">
                  <span>{t('joinOurTeam.whatWeOffer.teamAtmosphere')}</span>
                </li>
                <li className="items-center">
                  <span>
                    {t('joinOurTeam.whatWeOffer.physicalOutdoorWork')}
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 rounded-md ring-1 ring-black/5 flex items-stretch">
              <picture className="w-full h-full">
                <img
                  src="/images/careers/careers-banner.jpg"
                  alt="Tent setup"
                  className="w-full h-full object-cover object-top rounded-md"
                />
              </picture>
            </div>
          </div>
        </div>
        <CareersForm />
      </div>
    </div>
  );
};
