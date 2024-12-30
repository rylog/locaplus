// src/components/PrivacyPolicyModal.tsx
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FormattedMessage } from 'react-intl';

interface PrivacyPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  open,
  onClose,
}: PrivacyPolicyModalProps) => {
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
              <FormattedMessage id={'privacyPolicy.title'} />
            </DialogTitle>
            <div className="flex flex-col gap-4">
              <p className="text-sm mt-2">
                <FormattedMessage id="privacyPolicy.intro" />
              </p>
              <div>
                <h2 className="font-bold">
                  <FormattedMessage id="privacyPolicy.infoCollection.title" />
                </h2>
                <p className="text-sm mt-1">
                  <FormattedMessage id="privacyPolicy.infoCollection.description" />
                </p>
              </div>
              <div>
                <h2 className="font-bold">
                  <FormattedMessage id="privacyPolicy.howWeUse.title" />
                </h2>
                <p className="text-sm mt-1">
                  <FormattedMessage id="privacyPolicy.howWeUse.description" />
                </p>
              </div>
              <div>
                <h2 className="font-bold">
                  <FormattedMessage id="privacyPolicy.protection.title" />
                </h2>
                <p className="text-sm mt-1">
                  <FormattedMessage id="privacyPolicy.protection.description" />
                </p>
              </div>

              <div>
                <h2 className="font-bold">
                  <FormattedMessage id="privacyPolicy.retention.title" />
                </h2>
                <p className="text-sm mt-1">
                  <FormattedMessage id="privacyPolicy.retention.description" />
                </p>
              </div>

              <div>
                <h2 className="font-bold">
                  <FormattedMessage id="privacyPolicy.contact.title" />
                </h2>
                <p className="text-sm mt-1">
                  <FormattedMessage id="privacyPolicy.contactInfo" />{' '}
                  <FormattedMessage id="privacyPolicy.contactEmail" />
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
