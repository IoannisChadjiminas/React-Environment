// webpack.config.js
function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

module.exports = {
  entry: { 
            getEntrySources: ([
                     './js/index.js'
                    ])
         },
  output: {
    publicPath: 'http://localhost:8080/', // <-- New line!
    filename: 'assets/bundle.js'       
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      {
        test: /\.js$/,
        loader: 'react-hot',
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test:/\.scss$/,
        loaders: ['style', 'css', 'sass'] 
      //  To compile SASS files, you need a SASS loader of course, but also a CSS and a style loaders. 
      //  Indeed, Webpack understands only JS. Basically explained, when we write a require('style.scss'),
      //  SASS loader turns it into style.css, which should then be turned into JavaScript with CSS loader, 
      //  and finally embedded as styles using the style loader.
      //  npm install --save-dev sass-loader css-loader style-loader
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee', '.scss'] 
  }
};