import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
    //   [
    //     '@nuxtjs/google-fonts',
    //     {
    //       families: {
    //         Roboto: true,
    //         'Roboto+Mono': true,
    //       },
    //     },
    //   ],
    //   '@nuxt/content',
  ],
  // css: ['@/assets/style/main.scss'],
});
