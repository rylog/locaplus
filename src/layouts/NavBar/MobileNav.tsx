import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

import Logo from '/Logo_locaplus.png';

import { NavItem } from '../../types/NavItem';

interface MobileNavProps {
  mobileNavOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
}

export const MobileNav = ({
  mobileNavOpen,
  setMobileMenuOpen,
  navItems,
}: MobileNavProps) => {
  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>
      <Dialog
        open={mobileNavOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img alt="" src={Logo} className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};