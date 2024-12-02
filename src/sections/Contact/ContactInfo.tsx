import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

import facebookIcon from '/assets/socials/facebook.svg';
import instagramIcon from '/assets/socials/instagram.svg';
import linkedInIcon from '/assets/socials/linkedIn.svg';

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-4 justify-between bg-white border border-gray rounded-l-2xl">
      <div className="flex flex-col px-12 py-10 gap-5 border-gray border-b">
        <div>
          <p className="text-lg font-medium flex">Phone</p>
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
          <p className="text-lg font-medium flex">Email</p>
          <div className="flex flex-col gap-2">
            <div className="flex py-4 items-center">
              <EnvelopeIcon className="h-6 w-6 mr-5" />
              <div>
                <p className="text-gray-600">support@locaplus.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md px-12 py-10  border-gray border-b">
        <p className="text-lg font-medium flex">Office</p>
        <div className="flex flex-col gap-2">
          <div className="flex py-4 items-center">
            <BuildingOffice2Icon className="h-6 w-6 mr-5" />
            <div>
              <p className="text-gray-600">
                203 Rue des Alouettes, Saint-Alphonse-de-Granby
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md px-12 py-10 items-end">
        <div>
          <p className="text-lg font-medium flex">Follow Us</p>
          <div className="flex py-4 items-center gap-6">
            <img
              src={facebookIcon}
              alt="Follow us on Facebook"
              className="w-8 h-8"
            />
            <img
              src={instagramIcon}
              alt="Follow us on Instagram"
              className="w-8 h-8"
            />
            <img
              src={linkedInIcon}
              alt="Follow us on Linkedin"
              className="w-8 h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
