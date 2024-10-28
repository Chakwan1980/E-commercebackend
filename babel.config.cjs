// babel.config.cjs
module.exports = {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: 'current'
        },
        modules: 'auto'
      }],
      '@babel/preset-react' // Si estás usando React
    ],
    plugins: [],
  };
  