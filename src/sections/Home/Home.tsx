import { FormattedMessage } from 'react-intl';

import HomePageImage from '/MainPageTent.jpg';

import { Header } from '../../components/Header/Header';

export const Home = () => {
  return (
    <section id="home" className="isolate h-full px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <Header>
            <FormattedMessage id="home.title" />
          </Header>
          <h1 className="text-balance text-4xl font-medium tracking-tight text-slate-100 sm:text-6xl"></h1>
          <p className="mt-8 text-pretty text-lg font-normal text-slate-300 sm:text-xl/8">
            <FormattedMessage id="home.subtitle" />
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contact"
              className="mt-10 flex items-center justify-center gap-x-6 transform transition duration-200 rounded-md bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 shadow-sm hover:bg-opacity-80 hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:shadow-inner"
            >
              <FormattedMessage id="home.requestQuote" />
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${HomePageImage}')`,
        }}
        className={`absolute inset-0 -z-10 h-auto w-full brightness-150 bg-cover bg-center bg-no-repeat`}
      />
    </section>
  );
};
