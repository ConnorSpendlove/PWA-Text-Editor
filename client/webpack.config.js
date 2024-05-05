const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
module.exports = () => {
  return {
    // Set webpack mode to production
    mode: 'production',
     // Define entry points for the application
    entry: {
      main: '/src/js/index.js',
      install: '/src/js/install.js'
    },
    // Define output configuration
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
     // Define plugins used by webpack
    plugins: [

       // Generate HTML file based on template
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),

      // Generate web app manifest file
      new WebpackPwaManifest({
        name: 'PWA Text Editor',
        short_name: 'J.A.T.E.',
        description: 'A very cool PWA notetaking app',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        fingerprints: false,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

       // Inject service worker into the build
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

     // Define module rules for processing different file types
    module: {
      rules: [
        {
          // Finds css files
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Finds files ending .png, .svg, .jpg, .jpeg .ico or .gif
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
           // Find JavaScript files
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ]
    },
  };
};
