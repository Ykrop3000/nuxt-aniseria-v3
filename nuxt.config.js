export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Список Аниме смотреть онлайн. Лучшие мультики и аниме мультфильмы в хорошем качестве бесплатно | AniSeria',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Смотреть аниме онлайн бесплатно. Большая база лучших аниме с русской озвучкой в хорошем качестве.' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', sizes:'32x32', type: 'image/x-icon', href: '/icon_32x32.png' },
      { rel: 'icon', sizes:'16x16', type: 'image/x-icon', href: '/icon_16x16.png' },
      { rel: 'canonical',  href: 'https://aniseria.ru/animes'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/866e703862.js', crossorigin:'anonymous'}
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/global.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/plugins',
    // '@/plugins/element-ui',
    '@/plugins/click-outside',
    '@/plugins/infinite-scroll',
    '@/plugins/perfect-scrollbar',
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/moment',
    '@nuxtjs/eslint-module',
    '@/modules/sitemapRouteGenerator'
  ],
  moment: {
    locales: ['ru']
  },
  eslint: {
    fix: true
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    // '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-lazy-load',
    '@nuxtjs/yandex-metrika'
  ],
  axios: {
    baseURL: 'https://shikimori.one',
    retry: { retries: 5 }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://graphql.anilist.co',
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  loading: {
    color: '#29a6ff',
    borderRadius: '0 10px 10px 0',
    height:' 4px',

  },

  loadingIndicator: {
    name: 'circle',
    color: '#29a6ff',
    background: '#29a6ff'
  },
  yandexMetrika: {
    id: '74589367',
    webvisor: true,
    clickmap: true,
    // useCDN:false,
     trackLinks: true,
     accurateTrackBounce: true
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://aniseria.ru/sitemap.xml'
  }
}
