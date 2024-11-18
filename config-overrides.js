module.exports = {
  // ... other settings
  module: {
    rules: [
      {
        test: /\.css$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        options: {
          filterSourceMappingUrl: (url, resourcePath) => {
            return !/bootstrap\.min\.css\.map$/.test(url);
          },
        },
      },
    ],
  },
};