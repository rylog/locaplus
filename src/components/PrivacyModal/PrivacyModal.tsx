// src/components/PrivacyPolicyModal.tsx
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface PrivacyPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: FC<PrivacyPolicyModalProps> = ({
  open,
  onClose,
}: PrivacyPolicyModalProps) => {
  const t = useTranslations('PrivacyPolicy');
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-x bg-white p-8 rounded-md max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>

            <DialogTitle className="font-bold text-lg">
              {t('title')}
            </DialogTitle>
            <div className="flex flex-col gap-4">
              <p className="text-sm mt-2">{t('intro')}</p>
              <div>
                <h2 className="font-bold">{t('infoCollection.title')}</h2>
                <p className="text-sm mt-1">
                  {t('infoCollection.description')}
                </p>
              </div>
              <div>
                <h2 className="font-bold">{t('howWeUse.title')}</h2>
                <p className="text-sm mt-1">{t('howWeUse.description')}</p>
              </div>
              <div>
                <h2 className="font-bold">{t('protection.title')}</h2>
                <p className="text-sm mt-1">{t('protection.description')}</p>
              </div>

              <div>
                <h2 className="font-bold">{t('retention.title')}</h2>
                <p className="text-sm mt-1">{t('retention.description')}</p>
              </div>

              <div>
                <h2 className="font-bold">{t('contact.title')}</h2>
                <p className="text-sm mt-1">
                  {t('contactInfo')} {t('contactEmail')}
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
