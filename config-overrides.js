const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.less$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#0DC4E0',
            },
            javascriptEnabled: true,
          },
        },
      },
    ],
  }),
  addWebpackModuleRule({
    test: /\.svg$/,
    use: [{
      loader: '@svgr/webpack',
      options: {
        svgoConfig: {
          plugins: {
            removeViewBox: false,
          },
        },
      },
    }],
  }),
);
