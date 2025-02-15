export const Setting = {
  name: 'next-ts-shadcn-boilerplate',
  displayName: 'Next TS Shadcn Boilerplate',
  //   site: 'https://chocoding.vercel.app/',

  versioning: {
    ver: '1.0',
    date: '31-May-2024',
  },

  defaultLanguage: 'id',
  languageSupport: ['en', 'id'] as const,
  defaultTheme: 'system',
  themeSupport: ['light', 'dark', 'system'] as const,

  numberPrecision: 2,
  moneyPrecision: 0,
  defaultIconSize: 16,

  progressBarColor: '#C8CBB8',
  progressBarThickness: '4px',

  author: {
    name: 'chocoding.in',
    displayName: 'Chocoding',
    github: 'https://github.com/Diaz-adrianz',
    insta: 'https://www.instagram.com/chocoding.in',
    logo: {
      default: 'logo.svg',
    },
  },
};
