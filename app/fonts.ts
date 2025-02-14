import localFont from 'next/font/local';

export const kalosFont = localFont({
  src: '../public/fonts/Blacksword.woff2',
  variable: '--kalos-font',
});

export const mainFont = localFont({
  src: [
    {
      path: '../public/fonts/NotoSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NotoSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/NotoSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--main-font',
});
