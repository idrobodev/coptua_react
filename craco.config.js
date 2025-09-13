module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  babel: {
    presets: [
      ['@babel/preset-env', { 
        targets: { 
          node: 'current',
          browsers: ['>0.25%', 'not dead']
        },
        useBuiltIns: 'entry',
        corejs: 3
      }],
      '@babel/preset-react'
    ],
    plugins: [
      ["@babel/plugin-transform-class-properties", { "loose": true }],
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
      ["@babel/plugin-transform-runtime", { "loose": true }]
    ]
  }
};
