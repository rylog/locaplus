import { FormattedMessage } from 'react-intl';

import HomeBackgroundJpg from '/assets/home/MainPageTent.jpg';
import HomeBackgroundWebP from '/assets/home/MainPageTent.webp';

import { Header } from '../../components/Header/Header';
import { SECTIONS } from '../../constants/sections';

export const Home = () => {
  return (
    <section
      id={SECTIONS.HOME}
      className="flex isolate h-full px-6 pt-14 lg:px-8 bg-no-repeat bg-cover bg-center"
    >
      <div className="flex flex-col mx-auto max-w-4xl max-h-full absolute left-0  right-0 top-[30%]">
        <div className="flex flex-col *:text-center place-content-center gap-10">
          <div className="flex flex-col gap-8">
            <Header>
              <FormattedMessage id="home.title" />
            </Header>
            <h2 className="text-pretty text-lg font-normal text-slate-300 sm:text-xl/8">
              <FormattedMessage id="home.subtitle" />
            </h2>
          </div>
          <a
            href={`#${SECTIONS.QUOTE}`}
            className="self-center transform transition duration-200 w-fit rounded-md bg-primary px-3.5 py-2.5 text-sm text-slate-100 shadow-sm hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:shadow-inner"
          >
            <FormattedMessage id="home.requestQuote" />
          </a>
        </div>
      </div>
      <picture>
        <source srcSet={HomeBackgroundWebP} type="image/webp" />
        <img
          src={HomeBackgroundJpg}
          alt="Tent image"
          className="object-cover w-full h-full absolute top-0 left-0 z-[-1]"
        />
      </picture>
    </section>
  );
};
