// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    nasaApodKey: '',
    nasaApodBase: 'https://api.nasa.gov/planetary/apod',
  },
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt', 'dayjs-nuxt', '@nuxt/image'],
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
  ui: {
    icons: ['ph'],
  },
  dayjs: {
    plugins: ['customParseFormat', 'isToday'],
  },
})
