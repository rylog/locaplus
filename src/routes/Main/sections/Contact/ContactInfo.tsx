import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import facebookIcon from '@/assets/images/socials/facebook.svg';
import instagramIcon from '@/assets/images/socials/instagram.svg';
import linkedInIcon from '@/assets/images/socials/linkedIn.svg';

const ContactInfo = () => {
  const t = useTranslations('HomePage');
  return (
    <div className="flex flex-col gap-4 bg-white lg:border lg:border-gray lg:rounded-l-2xl">
      <div className="flex flex-col px-12 py-10 gap-5 border-gray border-b">
        <div>
          <p className="text-lg font-medium flex">{t('contactInfo.phone')}</p>
          <div className="flex flex-col">
            <div className="flex py-4 items-center">
              <PhoneIcon className="h-6 w-6 mr-5" />
              <div>
                <a href="tel:+1-450-777-0233" className="flex text-gray-600">
                  +1 (450) 777-0233
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium flex">{t('contactInfo.email')}</p>
          <div className="flex flex-col gap-2">
            <div className="flex py-4 items-center">
              <EnvelopeIcon className="h-6 w-6 mr-5" />
              <div>
                <a href="mailto:contact@locaplus.net" className="text-gray-600">
                  contact@locaplus.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md px-12 py-10  border-gray border-b">
        <p className="text-lg font-medium flex">{t('contactInfo.office')}</p>
        <div className="flex flex-col gap-2">
          <div className="flex py-4 items-center">
            <BuildingOffice2Icon className="h-6 w-6 mr-5" />
            <div>
              <p className="text-gray-600">{t('contactInfo.address')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md px-12 py-10 items-end">
        <div>
          <p className="text-lg font-medium flex">
            {t('contactInfo.followUs')}
          </p>
          <div className="flex py-4 items-center gap-6">
            <a href="https://www.facebook.com/Locaplus.net/">
              <Image
                width={48}
                height={48}
                src={facebookIcon}
                alt="Follow us on Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href="https://www.instagram.com/chapiteaulocaplus/">
              <Image
                width={48}
                height={48}
                src={instagramIcon}
                alt="Follow us on Instagram"
                className="w-8 h-8"
              />
            </a>
            <a href="https://www.linkedin.com/company/chapiteau-locaplus/">
              <Image
                width={48}
                height={48}
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
