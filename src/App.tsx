'use client';

import { useState } from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import HomePageImage from '/MainPageTent.jpg';
import Logo from '/Logo_locaplus.png';

const navigation = [
  { name: 'Tents', href: '#' },
  { name: 'Photos', href: '#' },
  { name: 'Contact Us', href: '#' },
];

export const Example = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={Logo} className="h-14 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden"></div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base font-semibold leading-6 text-gray-900 hover:underline"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <LanguageSelector />
          </div>
        </nav>
      </header>

      <div className="isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Reliable Equipment Rentals For Every Event
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8 [text-shadow:_2px_2px_6px_rgba(0,0,0,0.8)]">
              With over 30 years of experience, Locaplus provides reliable,
              quality rentals to make your event a success.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
        <img
          src={HomePageImage}
          alt=""
          className="absolute inset-0 -z-10 h-auto w-full object-cover object-center md:object-center brightness-150  bg-center min-h-screen"
        />
      </div>
    </div>
  );
};
