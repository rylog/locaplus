import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDoubleDownIcon';
import { clsx } from 'clsx';
import { useNavigate, useParams } from 'react-router';

import { Locale } from '../../context/LocaleContext';

export const LanguageSelector = () => {
  const { locale } = useParams<{ locale: Locale }>();
  const navigate = useNavigate();

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Français', code: 'fr' },
  ];

  const handleLanguageChange = (value: string) => {
    navigate(`/${value}`, { replace: true });
  };

  return (
    <Listbox value={locale} onChange={handleLanguageChange}>
      <div className="relative w-fit">
        <ListboxButton
          className={clsx(
            'rounded-lg w-28 bg-white/5 py-1.5 pr-8 text-left font-semibold text-base text-gray-900',
            'lg:pl-3 lg:text-sm/6  lg:font-normal lg:text-white',
            'focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
          )}
        >
          {languages.find((lang) => lang.code === locale)?.name}
          <ChevronDownIcon
            className={clsx(
              'group pointer-events-none absolute top-2.5 right-2.5 size-4 lg:fill-white/60',
            )}
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className={clsx(
            'absolute right-0 mt-1 w-28 rounded-md border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-hidden',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0',
          )}
          modal={false}
        >
          {languages.map(
            (language) =>
              locale != language.code && (
                <ListboxOption
                  key={language.code}
                  value={language.code}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-0.5 px-3 select-none data-focus:bg-white/10"
                >
                  <div
                    className={clsx(
                      'lg:text-sm/6  lg:font-normal lg:text-white',
                    )}
                  >
                    {language.name}
                  </div>
                </ListboxOption>
              ),
          )}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
