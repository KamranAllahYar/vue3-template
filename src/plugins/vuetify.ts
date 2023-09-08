import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure you have the correct path to the styles
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});
