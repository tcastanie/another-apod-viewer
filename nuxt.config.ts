// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    nasaApodKey: '',
    nasaApodBase: 'https://api.nasa.gov/planetary/apod',
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-07-28',
  app: {
    head: {
      link: [{ rel: 'author', href: 'https://tcastanie.dev' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    '@nuxt/image',
    '@nuxtjs/seo',
  ],
  routeRules: {
    // '/': { swr: 3600 * 8 },
    // '/**': { swr: true },
    '/search': { redirect: { to: '/', statusCode: 301 } },
    '/about': { redirect: { to: '/', statusCode: 301 } },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  colorMode: {
    preference: 'dark',
  },

  dayjs: {
    plugins: ['customParseFormat', 'isToday'],
  },
  site: {
    url: 'https://apod.tcastanie.dev',
    name: 'Another APOD viewer',
    description: 'Simple APOD viewer nuxt app',
    defaultLocale: 'en',
  },
  ogImage: {
    enabled: false,
  },
})
