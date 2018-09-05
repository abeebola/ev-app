let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
mix.js('resources/assets/js/vue_app.js', 'public/js')
    .extract(['vue', 'vuetify', 'vuex', 'axios', 'vue-axios', 'vue-router', 'moment', 'chart.js', 'vue-chartjs', 'accounting'])
    .sass('resources/assets/sass/app.scss', 'public/css')
    .styles([
        'node_modules/vuetify/dist/vuetify.css',
    ], 'public/css/vuetify.css')
    .styles(['node_modules/material-design-icons-iconfont/dist/material-design-icons.css'], 'public/css/material-icons.css')
    .version();
