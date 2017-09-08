const postcss = require('postcss');

module.exports = postcss.plugin('isotope', (opts = {}) => {
  const bundle = postcss()

  bundle.use(require('./plugins/stateful')({
    states: ['hover', 'active', 'focus']
  }))

  bundle.use(require('./plugins/responsive')({
    breakpoints: {
      // Small screen / phone
      sm: '576px',
      // Medium screen / tablet
      md: '768px',
      // Large screen / desktop
      lg: '992px',
      // Extra large screen / wide desktop
      xl: '1200px'
    }
  }))

  bundle.use(require('./plugins/utilizes'))

  return bundle
})