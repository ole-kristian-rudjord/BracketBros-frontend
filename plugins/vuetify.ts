import { createVuetify } from 'vuetify';
import 'vuetify/styles';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'customDarkTheme',
      themes: {
        customDarkTheme: {
          dark: true,
          colors: {
            primary: '#1A72E9',
          },
        },
        customLightTheme: {
          dark: false,
          colors: {
            primary: '#1A72E9',
          },
        },
      },
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 3,
        darken: 3,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
