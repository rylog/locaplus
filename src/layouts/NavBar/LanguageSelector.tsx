import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

import { useLocale } from '../../context/LocaleContext';

export const LanguageSelector = () => {
  const { locale, setLocale } = useLocale();

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Français', code: 'fr' },
  ];

  return (
    <Listbox value={locale} onChange={setLocale}>
      <div className="relative">
        <ListboxButton
          className={clsx(
            'rounded-lg w-32 bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
          )}
        >
          {languages.find((lang) => lang.code === locale)?.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className={clsx(
            'absolute right-0 mt-1 w-32 rounded-md border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
          )}
          modal={false}
        >
          {languages.map(
            (language) =>
              locale != language.code && (
                <ListboxOption
                  key={language.code}
                  value={language.code}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-0.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <div className="text-sm/6 text-white">{language.name}</div>
                </ListboxOption>
              ),
          )}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
