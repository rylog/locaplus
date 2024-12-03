import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { FormattedMessage } from 'react-intl';

import facebookIcon from '/assets/socials/facebook.svg';
import instagramIcon from '/assets/socials/instagram.svg';
import linkedInIcon from '/assets/socials/linkedIn.svg';

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-4 justify-between bg-white lg:border lg:border-gray lg:rounded-l-2xl">
      <div className="flex flex-col px-12 py-10 gap-5 border-gray border-b">
        <div>
          <p className="text-lg font-medium flex">
            <FormattedMessage id="contactInfo.phone" />
          </p>
          <div className="flex flex-col">
            <div className="flex py-4 items-center">
              <PhoneIcon className="h-6 w-6 mr-5" />
              <div>
                <p className="font-bold">Bromont, Granby, Southshore</p>
                <p className="flex text-gray-600">+1 (450) 654-3210</p>
              </div>
            </div>
            <div className="flex py-4 items-center">
              <PhoneIcon className="h-6 w-6 mr-5" />
              <div>
                <p className="font-bold">Sherbrooke, Magog</p>
                <p className="flex text-gray-600">+1 (819) 347-9544</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium flex">
            <FormattedMessage id="contactInfo.email" />
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex py-4 items-center">
              <EnvelopeIcon className="h-6 w-6 mr-5" />
              <div>
                <p className="text-gray-600">contact@locaplus.net</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md px-12 py-10  border-gray border-b">
        <p className="text-lg font-medium flex">
          <FormattedMessage id="contactInfo.office" />
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex py-4 items-center">
            <BuildingOffice2Icon className="h-6 w-6 mr-5" />
            <div>
              <p className="text-gray-600">
                <FormattedMessage id="contactInfo.address" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md px-12 py-10 items-end">
        <div>
          <p className="text-lg font-medium flex">
            <FormattedMessage id="contactInfo.followUs" />
          </p>
          <div className="flex py-4 items-center gap-6">
            <a href="https://www.facebook.com/Locaplus.net/">
              <img
                src={facebookIcon}
                alt="Follow us on Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href="https://www.instagram.com/chapiteaulocaplus/">
              <img
                src={instagramIcon}
                alt="Follow us on Instagram"
                className="w-8 h-8"
              />
            </a>
            <a href="https://www.linkedin.com/company/chapiteau-locaplus/">
              <img
                src={linkedInIcon}
                alt="Follow us on Linkedin"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
