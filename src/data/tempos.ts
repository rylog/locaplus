import Tempo11x16Img from '@/assets/images/tempos/tempo-11x16.webp';
import Tempo11x20Img from '@/assets/images/tempos/tempo-11x20.webp';
import Tempo20x20Img from '@/assets/images/tempos/tempo-20x20.webp';

export const temposData = [
  {
    name: 'TemposPage.popularShelters.shelters.elevenSixteen.name',
    size: 'TemposPage.popularShelters.shelters.elevenSixteen.size',
    desc: 'TemposPage.popularShelters.shelters.elevenSixteen.desc',
    img: Tempo11x16Img,
  },
  {
    name: 'TemposPage.popularShelters.shelters.elevenTwenty.name',
    size: 'TemposPage.popularShelters.shelters.elevenTwenty.size',
    desc: 'TemposPage.popularShelters.shelters.elevenTwenty.desc',
    img: Tempo11x20Img,
  },
  {
    name: 'TemposPage.popularShelters.shelters.twentyTwenty.name',
    size: 'TemposPage.popularShelters.shelters.twentyTwenty.size',
    desc: 'TemposPage.popularShelters.shelters.twentyTwenty.desc',
    img: Tempo20x20Img,
  },
] as const;
