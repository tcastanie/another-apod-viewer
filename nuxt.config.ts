// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    '@nuxt/image',
    '@nuxtjs/seo',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'author', href: 'https://tcastanie.dev' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  site: {
    url: 'https://apod.tcastanie.dev',
    name: 'Another APOD viewer',
    description: 'Simple APOD viewer nuxt app',
    defaultLocale: 'en',
  },
  colorMode: {
    preference: 'dark',
  },
  runtimeConfig: {
    nasaApodKey: '',
    nasaApodBase: 'https://api.nasa.gov/planetary/apod',
  },
  routeRules: {
    // '/': { swr: 3600 * 8 },
    // '/**': { swr: true },
    '/search': { redirect: { to: '/', statusCode: 301 } },
    '/about': { redirect: { to: '/', statusCode: 301 } },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-07-28',
  dayjs: {
    plugins: ['customParseFormat', 'isToday'],
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  ogImage: {
    enabled: false,
  },
})
