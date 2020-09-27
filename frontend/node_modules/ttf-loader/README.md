# ttf-loader
[![npm version](https://badge.fury.io/js/ttf-loader.svg)](https://badge.fury.io/js/ttf-loader)[![Build Status](https://travis-ci.org/unimonkiez/ttf-loader.svg?branch=master)](https://travis-ci.org/unimonkiez/ttf-loader)

## Import and use fonts easily in your javascript web app

## Usage
* Install
  ```bash
  # file-loader is peerDependency
  npm install --save-dev ttf-loader file-loader
  # or yarn
  yarn add -D ttf-loader file-loader
  ```
* Add loader to your `webpack-config`
  ```js
  ...
   module: {
      rules: [
        {
            test: /\.ttf$/,
            use: [
              {
                loader: 'ttf-loader',
                options: {
                  name: './font/[hash].[ext]',
                },
              },
            ]
        }
      ]
   }
  ```
* Import ttfs and use them in your code!
  * Inline
  ```jsx
  import React, { Component } from 'react';
  import someFontFamily from 'some.ttf';
  
  export default class App extends Component {
    render() {
      return (
        <div style={{ fontFamily: someFontFamily }}>
          <span>
            Welcome to my React app!
          </span>
        </div>
      );
    }
  }
  ```
  * jss
  ```jsx
  import React, { Component } from 'react';
  import jss from 'jss';
  import someFontFamily from 'some.ttf';

  const spanClass = jss.createStyleSheet({
    span: {
      'font-family': someFontFamily,
    },
  }).attach().classes.span;
  
  export default class App extends Component {
    render() {
      return (
        <div className={spanClass}>
          <span>
            Welcome to my React app!
          </span>
        </div>
      );
    }
  }
  ```
  