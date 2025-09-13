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
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime'
    ]
  }
};
