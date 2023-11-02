import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css';
import { fa } from 'vuetify/iconsets/fa';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'fa',
      sets: {
        fa,
      },
    },
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
