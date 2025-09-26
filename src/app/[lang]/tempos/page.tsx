'use client';

import { Package, Ruler, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

import Logo from '@/../public/Logo_locaplus.png';
import { ConsentCheckbox } from '@/components/Form/ConsentCheckbox/ConsentCheckbox';
import { MessageInput } from '@/components/Form/MessageInput/MessageInput';
import { SelectInput } from '@/components/Form/SelectInput/SelectInput';
import { TextInput } from '@/components/Form/TextInput/TextInput';
import { SECTIONS } from '@/constants/sections';
import { Link } from '@/i18n/routing';
import { LABEL_COLORS } from '@/styles/colors';

export default function TemposPage() {
  const { register, control, formState } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    carportDimensions: string;
    serviceType: string;
    message: string;
    consent: boolean;
  }>({
    mode: 'onSubmit',
  });

  const { errors } = formState;

  const t = useTranslations();

  const tempos = [
    {
      name: t('TemposPage.popularShelters.items.0.name'),
      size: t('TemposPage.popularShelters.items.0.size'),
      desc: t('TemposPage.popularShelters.items.0.desc'),
      img: '/images/tempos/tempo-11x16.webp',
    },
    {
      name: t('TemposPage.popularShelters.items.1.name'),
      size: t('TemposPage.popularShelters.items.1.size'),
      desc: t('TemposPage.popularShelters.items.1.desc'),
      img: '/images/tempos/tempo-11x20.webp',
    },
    {
      name: t('TemposPage.popularShelters.items.2.name'),
      size: t('TemposPage.popularShelters.items.2.size'),
      desc: t('TemposPage.popularShelters.items.2.desc'),
      img: '/images/tempos/tempo-18x20.webp',
    },
    {
      name: t('TemposPage.popularShelters.items.3.name'),
      size: t('TemposPage.popularShelters.items.3.size'),
      desc: t('TemposPage.popularShelters.items.3.desc'),
      img: '/images/tempos/tempo-20x20.webp',
    },
  ];

  const features = [
    {
      title: t('TemposPage.whyChoose.features.durable.title'),
      desc: t('TemposPage.whyChoose.features.durable.desc'),
      icon: Shield,
    },
    {
      title: t('TemposPage.whyChoose.features.fastSetup.title'),
      desc: t('TemposPage.whyChoose.features.fastSetup.desc'),
      icon: Zap,
    },
    {
      title: t('TemposPage.whyChoose.features.flexible.title'),
      desc: t('TemposPage.whyChoose.features.flexible.desc'),
      icon: Package,
    },
    {
      title: t('TemposPage.whyChoose.features.customSizes.title'),
      desc: t('TemposPage.whyChoose.features.customSizes.desc'),
      icon: Ruler,
    },
  ];

  const carportOptions = [
    { value: '11x16x6.6', label: '11 x 16 x 6\'6"' },
    { value: '11x20x6.6', label: '11 x 20 x 6\'6"' },
    { value: '18x20x6.6', label: '18 x 20 x 6\'6"' },
    { value: '20x20x6.6', label: '20 x 20 x 6\'6"' },
    {
      value: t('TemposPage.carportOptions.other'),
      label: t('TemposPage.carportOptions.other'),
    },
  ];

  const serviceOptions = [
    {
      value: t('TemposPage.serviceOptions.rent'),
      label: t('TemposPage.serviceOptions.rent'),
    },
    {
      value: t('TemposPage.serviceOptions.purchase'),
      label: t('TemposPage.serviceOptions.purchase'),
    },
    {
      value: t('TemposPage.installation'),
      label: t('TemposPage.installation'),
    },
  ];

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-3 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              aria-label={'Go to the home page'}
            >
              <Image
                width={191}
                height={100}
                alt="Locaplus Logo"
                src={Logo.src}
                className="h-14 w-auto"
              />
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-col">
        {/* Hero content */}
        <div className="relative px-6 py-36 lg:px-8 bg-slate-900 text-white text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              {t('TemposPage.hero.title')}
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl">
              {t('TemposPage.hero.subtitle')}
            </p>
            <div className="mt-10">
              <a
                href={`#${SECTIONS.QUOTE}`}
                className="inline-block rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-950"
              >
                {t('TemposPage.hero.cta')}
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <section className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {/* Left side: Text + features */}
              <div className="lg:pt-4 lg:pr-8">
                <div className="lg:max-w-lg">
                  <h2 className="text-primary font-semibold text-base mb-2">
                    {t('TemposPage.whyChoose.subtitle')}
                  </h2>
                  <p className="mt-2 text-4xl font-semibold text-gray-900 sm:text-5xl">
                    {t('TemposPage.whyChoose.title')}
                  </p>
                  <p className="mt-6 text-lg text-gray-700">
                    {t('TemposPage.whyChoose.description')}
                  </p>

                  <dl className="mt-10 max-w-xl space-y-8 text-base text-gray-600 lg:max-w-none">
                    {features.map((feature) => (
                      <div key={feature.title} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <feature.icon className="absolute top-1 left-1 w-5 h-5 text-[#0d2d51]" />
                          {feature.title}.
                        </dt>
                        <dd className="inline ml-1">{feature.desc}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Right side: Image */}
              <div className="relative lg:pt-4">
                <Image
                  src="/images/tempos/tempo-display.jpg"
                  alt="Tempo shelter"
                  width={1440}
                  height={1440}
                  className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[36rem] md:-ml-4 lg:-ml-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Options Section */}
        <section className="bg-gray-50 py-24 px-6">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('TemposPage.popularShelters.title')}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {t('TemposPage.popularShelters.description')}
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
            {tempos.map((tempo) => (
              <div
                key={tempo.size}
                className="bg-white shadow-md rounded-2xl p-10 text-center flex flex-col"
              >
                <div className="w-full h-56 relative mb-6">
                  <Image
                    src={tempo.img}
                    alt={tempo.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <h3 className="font-semibold text-2xl">{tempo.name}</h3>
                <p className="text-gray-500 text-lg mb-4">{tempo.size}</p>
                <p className="text-gray-600 flex-grow">{tempo.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-24 text-center text-gray-500">
            {t('TemposPage.popularShelters.cta')}
          </p>
        </section>

        {/* Call to Action */}
        <section
          className="isolate bg-slate-900 px-6 py-24 sm:py-32 lg:px-8"
          id={SECTIONS.QUOTE}
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {t('TemposPage.quoteForm.title')}
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              {t('TemposPage.quoteForm.subtitle')}
            </p>
          </div>

          <form
            action="#"
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <TextInput
                {...register('firstName', {
                  required: t('Form.error.firstName.required'),
                })}
                required
                autoComplete="given-name"
                label={t('Form.firstName')}
                labelColor={LABEL_COLORS.CONTACT_FORM}
                errors={errors}
              />
              <TextInput
                {...register('lastName', {
                  required: t('Form.error.lastName.required'),
                })}
                required
                name="lastName"
                autoComplete="family-name"
                label={t('Form.lastName')}
                labelColor={LABEL_COLORS.CONTACT_FORM}
                errors={errors}
              />

              <Controller
                name="serviceType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectInput
                    {...field} // gives value and onChange
                    label={t('TemposPage.serviceType.label')}
                    labelColor="text-gray-300"
                    options={serviceOptions}
                    errors={errors}
                    placeholder={t('TemposPage.serviceType.placeholder')}
                    required
                  />
                )}
              />
              <Controller
                name="carportDimensions"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectInput
                    {...field} // gives value and onChange
                    label={t('TemposPage.carportDimensions.label')}
                    labelColor="text-gray-300"
                    options={carportOptions}
                    errors={errors}
                    placeholder={t('TemposPage.carportDimensions.placeholder')}
                    required
                  />
                )}
              />

              <TextInput
                {...register('email', {
                  required: t('Form.error.email.required'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('Form.error.email.invalid'),
                  },
                })}
                required
                className={'sm:col-span-2'}
                autoComplete="email"
                label={t('Form.email')}
                labelColor={LABEL_COLORS.CONTACT_FORM}
                errors={errors}
              />
              <TextInput
                {...register('phoneNumber', {
                  required: t('Form.error.phoneNumber.required'),
                })}
                required
                className={'sm:col-span-2'}
                autoComplete="tel"
                label={t('Form.phoneNumber')}
                labelColor={LABEL_COLORS.CONTACT_FORM}
                errors={errors}
              />

              <MessageInput
                {...register('message')}
                className={'sm:col-span-2'}
                name={'message'}
                label={t('Form.message')}
                labelColor={LABEL_COLORS.CONTACT_FORM}
                errors={errors}
              />

              <ConsentCheckbox
                {...register('consent', {
                  validate: {
                    isChecked: (value: boolean) =>
                      value || t('Form.error.consentCheckbox.isChecked'),
                  },
                })}
                name={'consent'}
                errors={errors}
                className="mt-4 text-sm text-gray-400 sm:col-span-2"
              />
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {t('Form.submitQuote')}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
