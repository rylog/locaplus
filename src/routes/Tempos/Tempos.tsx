'use client';

import clsx from 'clsx';
import { CheckCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm, useWatch } from 'react-hook-form';

import {
  TempoQuoteRequest,
  useSendQuoteRequest,
} from '@/api/useSendQuoteRequest';
import { ConsentCheckbox } from '@/components/Form/ConsentCheckbox/ConsentCheckbox';
import { MessageInput } from '@/components/Form/MessageInput/MessageInput';
import { SelectInput } from '@/components/Form/SelectInput/SelectInput';
import { TextInput } from '@/components/Form/TextInput/TextInput';
import { NavBar } from '@/components/NavBar/NavBar';
import { SECTIONS } from '@/constants/sections';
import { temposData } from '@/data/tempos';
import { tempoFeaturesData } from '@/data/temposFeatures';
import { LABEL_COLORS } from '@/styles/colors';

import { FAQ } from './sections/FAQ';
import { RecentInstallations } from './sections/RecentInstallations';

interface QuoteFormInputs {
  firstName: string;
  lastName: string;
  location: string;
  carportDimensions: string;
  serviceType: string;
  email: string;
  phoneNumber: string;
  message: string;
  consent: boolean;
  reCaptchaToken: string;
}

export const Tempos = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { mutateAsync: sendQuoteAsync } = useSendQuoteRequest();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { register, control, formState, handleSubmit } =
    useForm<QuoteFormInputs>({
      mode: 'onSubmit',
    });

  const { errors, isSubmitting } = formState;
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: QuoteFormInputs) => {
    try {
      const tempoQuoteRequest: TempoQuoteRequest = {
        type: 'tempo',
        firstName: data.firstName,
        lastName: data.lastName,
        serviceType: data.serviceType,
        location: data.location,
        phoneNumber: data.phoneNumber,
        message: data.message,
        recipient: data.email,
        dimensions: data.carportDimensions,
        reCaptchaToken: data.reCaptchaToken,
        language: locale,
      };
      await sendQuoteAsync(tempoQuoteRequest);
      setFormSubmitted(true);
    } catch (error) {
      setError(t('Form.error.sendEmail.generic'));
      throw error;
    }
  };

  const reCaptchaToken = useWatch({ control, name: 'reCaptchaToken' });

  const carportOptions = [
    { value: '11 x 16 x 6\'6"', label: '11 x 16 x 6\'6"' },
    { value: '11 x 20 x 6\'6"', label: '11 x 20 x 6\'6"' },
    { value: '20 x 20 x 6\'6"', label: '20 x 20 x 6\'6"' },
    {
      value: t('Form.carportOptions.other'),
      label: t('Form.carportOptions.other'),
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
      value: t('TemposPage.serviceOptions.installation'),
      label: t('TemposPage.serviceOptions.installation'),
    },
  ];

  return (
    <div>
      <NavBar />
      <main className="flex flex-col bg-gray-50">
        {/* Hero content */}
        <div className="relative px-6 pt-36 pb-44 lg:px-8 bg-slate-900 text-white text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
              {t('TemposPage.hero.title')}
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl">
              {t('TemposPage.hero.subtitle')}
            </p>
            <div className="mt-10">
              <a
                href={`#${SECTIONS[locale].QUOTE}`}
                className="inline-block rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-950"
              >
                {t('TemposPage.hero.cta')}
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <section
          id={SECTIONS[locale].WHY_CHOOSE_US}
          className="relative overflow-hidden bg-white pt-24 py-8 rounded-4xl translate-y-8 z-10"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 md:pb-0 lg:pb-16">
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
                    {t.rich('TemposPage.whyChoose.description', {
                      b: (chunks) => (
                        <span className="font-semibold">{chunks}</span>
                      ),
                    })}
                  </p>

                  <dl className="mt-10 max-w-xl space-y-8 text-base text-gray-600 lg:max-w-none">
                    {tempoFeaturesData.map((feature) => (
                      <div key={t(feature.title)} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <feature.icon className="absolute top-1 left-1 w-5 h-5 text-primary" />
                          {t(feature.title)}.
                        </dt>
                        <dd className="inline ml-1">
                          {t.rich(feature.desc, {
                            b: (chunks) => (
                              <span className="font-semibold">{chunks}</span>
                            ),
                          })}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Right side: Image */}
              <div className="relative lg:pt-4 flex">
                <Image
                  src="/images/tempos/tempo-display.jpg"
                  alt="Tempo shelter"
                  width={1440}
                  height={1440}
                  className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-xl lg:ml-0 sm:mx-auto justify-self-center m-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Options Section */}
        <section
          id={SECTIONS[locale].POPULAR_SHELTERS}
          className="bg-gray-50 py-24 px-6"
        >
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('TemposPage.popularShelters.title')}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {t('TemposPage.popularShelters.description')}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:max-w-6xl max-w-lg mx-auto">
            {temposData.map((tempo) => (
              <div
                key={tempo.size}
                className="bg-white shadow-xs
                rounded-xl p-12 text-center flex flex-col"
              >
                <div className="w-full aspect-video relative mb-8">
                  <Image
                    src={tempo.img}
                    alt={tempo.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <h3 className="font-semibold text-3xl mb-2">{t(tempo.name)}</h3>
                <p className="text-gray-500 text-lg mb-6">{t(tempo.size)}</p>
                <p className="text-gray-700 text-base grow">{t(tempo.desc)}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-gray-500">
            {t('TemposPage.popularShelters.cta')}
          </p>
          <RecentInstallations />
        </section>
        <FAQ />
        {/* Quote Form Section */}
        {formSubmitted ? (
          <section
            id={SECTIONS[locale].QUOTE}
            className="relative isolate bg-slate-900 px-6 py-24 sm:py-32 lg:px-8 rounded-t-2xl z-10 min-h-[1000px] flex items-center justify-center"
          >
            <div className="flex flex-col gap-6 max-w-96">
              <h1 className="text-2xl text-white font-semibold tracking-loose sm:text-2xl text-center">
                {t('Form.requestQuote.success.title')}
              </h1>
              <CheckCircleIcon className="w-24 h-24 text-white m-auto" />
              <p className="text-white text-center">
                {t.rich('Form.requestQuote.success.message', {
                  br: () => <br />,
                })}
              </p>
            </div>
          </section>
        ) : (
          <section
            className="relative isolate bg-slate-900 px-6 py-24 sm:py-32 lg:px-8 rounded-t-2xl z-10"
            id={SECTIONS[locale].QUOTE}
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
              onSubmit={handleSubmit(onSubmit)}
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
                  rules={{ required: t('Form.error.serviceType.required') }}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectInput
                      {...field} // gives value and onChange
                      label={t('Form.serviceType.label')}
                      labelColor="text-gray-300"
                      options={serviceOptions}
                      errors={errors}
                      placeholder={t('Form.serviceType.placeholder')}
                      required
                    />
                  )}
                />
                <Controller
                  name="carportDimensions"
                  control={control}
                  rules={{
                    required: t('Form.error.carportDimensions.required'),
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectInput
                      {...field} // gives value and onChange
                      label={t('Form.carportDimensions.label')}
                      labelColor="text-gray-300"
                      options={carportOptions}
                      errors={errors}
                      placeholder={t('Form.carportDimensions.placeholder')}
                      required
                    />
                  )}
                />

                <TextInput
                  {...register('location', {
                    required: t('Form.error.location.required'),
                  })}
                  required
                  className={'sm:col-span-2'}
                  autoComplete="address"
                  label={t('Form.location')}
                  labelColor={LABEL_COLORS.CONTACT_FORM}
                  errors={errors}
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
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <div className="mt-8">
                <Controller
                  name="reCaptchaToken"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ReCAPTCHA
                      key={locale}
                      hl={locale}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="mt-10">
                <button
                  disabled={!reCaptchaToken || isSubmitting}
                  type="submit"
                  className={clsx(
                    'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs',
                    {
                      'bg-gray-500': isSubmitting,
                      'bg-primary': !isSubmitting,
                      'disabled:bg-gray-800 disabled:text-neutral-500 disabled:cursor-not-allowed': true,
                    },
                  )}
                >
                  {isSubmitting ? t('Form.sending') : t('Form.submitQuote')}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};
