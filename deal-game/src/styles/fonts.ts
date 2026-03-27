import { Inter, Special_Elite, Playfair_Display, Barlow_Condensed, Bebas_Neue, Yatra_One, Noto_Sans, Noto_Sans_Malayalam, Anek_Malayalam } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
export const specialElite = Special_Elite({ weight: '400', subsets: ['latin'], variable: '--font-special-elite', display: 'swap' });
export const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
export const barlowCondensed = Barlow_Condensed({ weight: ['400', '700', '900'], subsets: ['latin'], variable: '--font-barlow', display: 'swap' });
export const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' });
export const yatraOne = Yatra_One({ weight: '400', subsets: ['latin'], variable: '--font-yatra', display: 'swap' });
export const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto', display: 'swap' });
export const notoSansMalayalam = Noto_Sans_Malayalam({ weight: ['400', '700'], subsets: ['malayalam'], variable: '--font-noto-ml', display: 'swap' });
export const anekMalayalam = Anek_Malayalam({ weight: ['400', '800'], subsets: ['malayalam'], variable: '--font-anek-ml', display: 'swap' });
