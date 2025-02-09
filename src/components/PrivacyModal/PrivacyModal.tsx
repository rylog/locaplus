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
  const t = useTranslations('HomePage');
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-x bg-white p-8 rounded-md max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>

            <DialogTitle className="font-bold text-lg">
              {t('privacyPolicy.title')}
            </DialogTitle>
            <div className="flex flex-col gap-4">
              <p className="text-sm mt-2">{t('privacyPolicy.intro')}</p>
              <div>
                <h2 className="font-bold">
                  {t('privacyPolicy.infoCollection.title')}
                </h2>
                <p className="text-sm mt-1">
                  {t('privacyPolicy.infoCollection.description')}
                </p>
              </div>
              <div>
                <h2 className="font-bold">
                  {t('privacyPolicy.howWeUse.title')}
                </h2>
                <p className="text-sm mt-1">
                  {t('privacyPolicy.howWeUse.description')}
                </p>
              </div>
              <div>
                <h2 className="font-bold">
                  {t('privacyPolicy.protection.title')}
                </h2>
                <p className="text-sm mt-1">
                  {t('privacyPolicy.protection.description')}
                </p>
              </div>

              <div>
                <h2 className="font-bold">
                  {t('privacyPolicy.retention.title')}
                </h2>
                <p className="text-sm mt-1">
                  {t('privacyPolicy.retention.description')}
                </p>
              </div>

              <div>
                <h2 className="font-bold">
                  {t('privacyPolicy.contact.title')}
                </h2>
                <p className="text-sm mt-1">
                  {t('privacyPolicy.contactInfo')}{' '}
                  {t('privacyPolicy.contactEmail')}
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
