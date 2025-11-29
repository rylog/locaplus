import Tent10x10Img from '@/assets/images/tents/10x10.png';
import Tent10x20Img from '@/assets/images/tents/10x20.png';
import Tent20x20Img from '@/assets/images/tents/20x20.png';
import Tent20x30Img from '@/assets/images/tents/20x30.png';
import Tent20x40Img from '@/assets/images/tents/20x40.png';
import Tent40x200Img from '@/assets/images/tents/40w.png';
import Tent40x40Img from '@/assets/images/tents/40x40.jpeg';
import Tent40x60Img from '@/assets/images/tents/40x60.jpeg';
import Tent40x80Img from '@/assets/images/tents/40x80.png';
import Tent40x100Img from '@/assets/images/tents/40x100.png';
import Tent60x80Img from '@/assets/images/tents/60w.png';
import Tent60x100Img from '@/assets/images/tents/60w.png';
import Tent60x200Img from '@/assets/images/tents/60w.png';
import TentHexagonalImg from '@/assets/images/tents/hex.png';

export const tentsData = [
  {
    img: Tent10x10Img,
    key: 'HomePage.tent.10x10.name',
    spaceRequired: 'HomePage.tent.10x10.spaceRequired',
    min: 8,
    max: 10,
    alt: 'A small 10 by 10 tent',
  },
  {
    img: Tent10x20Img,
    key: 'HomePage.tent.10x20.name',
    spaceRequired: 'HomePage.tent.10x20.spaceRequired',
    min: 16,
    max: 20,
    alt: 'A medium 10 by 20 tent',
  },
  {
    img: Tent20x20Img,
    key: 'HomePage.tent.20x20.name',
    spaceRequired: 'HomePage.tent.20x20.spaceRequired',
    min: 32,
    max: 40,
    alt: 'A medium 20 by 20 tent',
  },
  {
    img: Tent20x30Img,
    key: 'HomePage.tent.20x30.name',
    spaceRequired: 'HomePage.tent.20x30.spaceRequired',
    min: 48,
    max: 60,
    alt: 'A medium 20 by 30 tent',
  },
  {
    img: Tent20x40Img,
    key: 'HomePage.tent.20x40.name',
    spaceRequired: 'HomePage.tent.20x40.spaceRequired',
    min: 64,
    max: 80,
    alt: 'A medium 20 by 40 tent',
  },
  {
    img: TentHexagonalImg,
    key: 'HomePage.tent.hexagonal.name',
    spaceRequired: 'HomePage.tent.hexagonal.spaceRequired',
    min: 84,
    max: 104,
    alt: 'A hexagonal tent',
  },
  {
    img: Tent40x40Img,
    key: 'HomePage.tent.40x40.name',
    spaceRequired: 'HomePage.tent.40x40.spaceRequired',
    min: 128,
    max: 160,
    alt: 'A medium 40 by 40 tent',
  },
  {
    img: Tent40x60Img,
    key: 'HomePage.tent.40x60.name',
    spaceRequired: 'HomePage.tent.40x60.spaceRequired',
    min: 192,
    max: 240,
    alt: 'A medium 40 by 60 tent',
  },
  {
    img: Tent40x80Img,
    key: 'HomePage.tent.40x80.name',
    spaceRequired: 'HomePage.tent.40x80.spaceRequired',
    min: 256,
    max: 320,
    alt: 'A medium 40 by 80 tent',
  },
  {
    img: Tent40x100Img,
    key: 'HomePage.tent.40x100.name',
    spaceRequired: 'HomePage.tent.40x100.spaceRequired',
    min: 320,
    max: 400,
    alt: 'A large 40 by 100 tent',
  },
  {
    img: Tent40x200Img,
    key: 'HomePage.tent.40x200.name',
    spaceRequired: 'HomePage.tent.40x200.spaceRequired',
    max: 800,
    alt: 'An extra large 40 by 200 tent',
  },
  {
    img: Tent60x80Img,
    key: 'HomePage.tent.60x80.name',
    spaceRequired: 'HomePage.tent.60x80.spaceRequired',
    min: 384,
    max: 480,
    alt: 'A large 60 by 80 tent',
  },
  {
    img: Tent60x100Img,
    key: 'HomePage.tent.60x100.name',
    spaceRequired: 'HomePage.tent.60x100.spaceRequired',
    min: 480,
    max: 600,
    alt: 'A large 60 by 100 tent',
  },
  {
    img: Tent60x200Img,
    key: 'HomePage.tent.60x200.name',
    spaceRequired: 'HomePage.tent.60x200.spaceRequired',
    max: 1200,
    alt: 'An extra large 60 by 200 tent',
  },
] as const;
