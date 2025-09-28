import { Package, Ruler, Shield, Zap } from 'lucide-react';

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
