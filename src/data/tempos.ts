import { Package, Ruler, Shield, Zap } from 'lucide-react';

export const temposData = [
  {
    name: 'TemposPage.popularShelters.items.0.name',
    size: 'TemposPage.popularShelters.items.0.size',
    desc: 'TemposPage.popularShelters.items.0.desc',
    img: '/images/tempos/tempo-11x16.webp',
  },
  {
    name: 'TemposPage.popularShelters.items.1.name',
    size: 'TemposPage.popularShelters.items.1.size',
    desc: 'TemposPage.popularShelters.items.1.desc',
    img: '/images/tempos/tempo-11x20.webp',
  },
  {
    name: 'TemposPage.popularShelters.items.2.name',
    size: 'TemposPage.popularShelters.items.2.size',
    desc: 'TemposPage.popularShelters.items.2.desc',
    img: '/images/tempos/tempo-18x20.webp',
  },
  {
    name: 'TemposPage.popularShelters.items.3.name',
    size: 'TemposPage.popularShelters.items.3.size',
    desc: 'TemposPage.popularShelters.items.3.desc',
    img: '/images/tempos/tempo-20x20.webp',
  },
] as const;

export const tempoFeaturesData = [
  {
    title: 'TemposPage.whyChoose.features.durable.title',
    desc: 'TemposPage.whyChoose.features.durable.desc',
    icon: Shield,
  },
  {
    title: 'TemposPage.whyChoose.features.fastSetup.title',
    desc: 'TemposPage.whyChoose.features.fastSetup.desc',
    icon: Zap,
  },
  {
    title: 'TemposPage.whyChoose.features.flexible.title',
    desc: 'TemposPage.whyChoose.features.flexible.desc',
    icon: Package,
  },
  {
    title: 'TemposPage.whyChoose.features.customSizes.title',
    desc: 'TemposPage.whyChoose.features.customSizes.desc',
    icon: Ruler,
  },
] as const;
