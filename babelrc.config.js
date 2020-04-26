module.exports = {
  presets: [
    "@babel/preset-env",
    {
      "useBuiltIns": "entry"
    },
    {
      "targets": "> 0.25%, not dead"
    }
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-object-assign',
    ['@babel/plugin-transform-classes', {
      'loose': true
    }],
    'transform-class-constructor-call',
    'transform-es2015-classes'
  ]
}