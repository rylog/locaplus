import configPromise from '@payload-config';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getPayload } from 'payload';

const CataloguePage = async ({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>;
}) => {
  const lang = (await params).lang;
  setRequestLocale(lang);
  const payload = await getPayload({ config: configPromise });

  const { docs: items } = await payload.find({
    collection: 'catalogue',
    depth: 2, // include media URLs
  });

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item) => (
            <a key={item.id} href="#" className="group">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-7/8">
                <Image
                  src={item.photos[0].url}
                  alt={item.title}
                  fill
                  className="object-contain w-full h-full group-hover:opacity-75 transition-opacity duration-200"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
              {item.price && (
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {item.price}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CataloguePage;
