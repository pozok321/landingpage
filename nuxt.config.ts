// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' }
      ]
    }
  },
  routeRules: {
    '/api/**': { 
      proxy: 'https://apiportal.undangin.com/**' 
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: '', // Biarkan kosong, Nuxt akan otomatis mengambil dari NUXT_PUBLIC_API_URL
      assetsUrl: '', 
    }
  },
  css: ['~/assets/css/global.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  ssr: false,
  googleFonts: {
    families: {
      Inter: [400, 700], // Sesuaikan weight yang dibutuhkan
    },
    display: 'swap', // Mencegah layout shift
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true, // Download font agar host sendiri (lebih cepat)
  }

  
})