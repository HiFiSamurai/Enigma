module.exports = {
  plugins: [
    'transform-custom-element-classes',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
  ],
  presets: ['@babel/preset-env'],
};
