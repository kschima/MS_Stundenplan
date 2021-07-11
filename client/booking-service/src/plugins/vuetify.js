import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import de from 'vuetify/es5/locale/de'

export default new Vuetify({
    lang: {
        locales: { de },
        current: 'de',
    },
    theme: {
        "primary": "#3f51b5",
    }
})