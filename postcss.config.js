module.exports = {
    plugins: [
      require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }),
    ],
  };
  