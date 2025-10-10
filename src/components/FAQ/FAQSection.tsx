'use client';

import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

export default function FAQSection() {
  const t = useTranslations('TemposPage.FAQ');
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const renderRichText = (key: Parameters<typeof t.rich>[0]) =>
    t.rich(key, {
      p: (chunks) => <p className="mt-2">{chunks}</p>,
      ul: (chunks) => (
        <ul className="list-disc ml-5 mt-2 space-y-1">{chunks}</ul>
      ),
      li: (chunks) => <li>{chunks}</li>,
    });

  const faqs = [
    { q: t('q1'), a: renderRichText('a1') },
    { q: t('q2'), a: renderRichText('a2') },
    { q: t('q3'), a: renderRichText('a3') },
    { q: t('q4'), a: renderRichText('a4') },
    { q: t('q5'), a: renderRichText('a5') },
    { q: t('q6'), a: renderRichText('a6') },
    { q: t('q7'), a: renderRichText('a7') },
    { q: t('q8'), a: renderRichText('a8') },
    { q: t('q9'), a: renderRichText('a9') },
    { q: t('q10'), a: renderRichText('a10') },
  ] as const;

  const toggleIndex = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <h2 className="mt-2 text-3xl md:text-4xl font-bold mb-4">
          {t('title')}
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-3xl divide-y divide-gray-200">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);

          return (
            <div key={index}>
              <button
                onClick={() => toggleIndex(index)}
                className="flex w-full items-center justify-between py-6 text-left text-slate-900"
              >
                <span className="font-semibold leading-7">{faq.q}</span>
                <ChevronDownIcon
                  className={`h-6 w-6 flex-none transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-slate-900' : 'text-gray-400'
                  }`}
                />
              </button>

              <div
                style={{
                  maxHeight: isOpen
                    ? contentRefs.current[index]?.scrollHeight
                    : 0,
                  transition: 'max-height 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <div className="pb-6 leading-7 text-gray-600">{faq.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
