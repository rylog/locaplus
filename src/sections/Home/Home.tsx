import { FormattedMessage } from 'react-intl';

import HomePageImage from '/MainPageTent.jpg';

import { Header } from '../../components/Header/Header';

export const Home = () => {
  return (
    <section
      id="home"
      className="flex isolate h-full px-6 pt-14 lg:px-8 snap-start"
    >
      <div className="flex flex-col mx-auto max-w-3xl max-h-full absolute left-0  right-0 top-[30%]">
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
            href="#contact"
            className="self-center transform transition duration-200 w-fit rounded-md bg-primary px-3.5 py-2.5 text-sm text-slate-100 shadow-sm hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:shadow-inner"
          >
            <FormattedMessage id="home.requestQuote" />
          </a>
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
