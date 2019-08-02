// This is the configuration file for react-styleguidist
module.exports = {
    components: 'src/components/**/*.{jsx,tsx}',
    styleguideDir: 'build/styleguide',
    title: 'Algoneer Style Guide',
    webpackConfig: require('./webpack-web.config.js'),
};
