import HomePageImage from '/MainPageTent.jpg';

export const Home = () => {
  return (
    <div className="isolate px-6 pt-14 lg:px-8 round">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-6xl">
            Reliable Equipment Rentals For Every Event
          </h1>
          <p className="mt-8 text-pretty text-lg font-normal text-gray-300 sm:text-xl/8">
            With over 30 years of experience, Locaplus provides reliable,
            quality rentals to make your event a success.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm  text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${HomePageImage}')`,
        }}
        className={`absolute inset-0 -z-10 h-auto w-full brightness-150 bg-cover  bg-center min-h-screen  bg-no-repeat `}
      />
    </div>
  );
};
