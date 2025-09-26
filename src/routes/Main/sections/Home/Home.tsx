import { useTranslations } from 'next-intl';

import HomeBackgroundJpg from '@/../public/images/home/HomePage.jpg';

import { SECTIONS } from '../../../../constants/sections';

export const Home = () => {
  const t = useTranslations('HomePage');
  return (
    <section
      id={SECTIONS.HOME}
      className="flex isolate h-full lg:px-8 bg-no-repeat bg-cover bg-center"
    >
      <div className="flex flex-col mx-auto max-w-4xl max-h-full absolute left-0 right-0 top-[30%]">
        <div className="flex flex-col *:text-center gap-10">
          <div className="flex flex-col gap-6 items-center">
            <h1 className="text-4xl font-medium tracking-tight sm:text-6xl text-white px-5">
              {t('home.title')}
            </h1>
            <h2 className="text-lg font-normal text-slate-100 sm:text-2xl/8 rounded-md px-5">
              {t('home.subtitle')}
            </h2>
          </div>
          <a
            href={`#${SECTIONS.QUOTE}`}
            className="self-center transform transition duration-200 w-fit rounded-md bg-primary px-3.5 py-2.5 text-m text-slate-100 shadow-xs hover:scale-105 hover:shadow-lg active:shadow-inner"
          >
            {t('home.requestQuote')}
          </a>
        </div>
      </div>
      <picture>
        <img
          src={HomeBackgroundJpg.src}
          alt="Locaplus home page background"
          className="object-cover w-full h-full absolute top-0 left-0 z-[-1] brightness-75"
        />
      </picture>
    </section>
  );
};
