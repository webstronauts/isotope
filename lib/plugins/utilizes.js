const escapeStringRegexp = require('escape-string-regexp')
const postcss = require('postcss')

/**
 * Usage:
 *
 * .utility-selector {
 *   color: black;
 * }
 *
 * .component {
 *   utilizes: .utility-selector;
 * }
 *
 * Output:
 *
 * .utility-selector {
 *   color: black;
 * }
 *
 * .component {
 *   color: black;
 * }
 */
module.exports = postcss.plugin('isotope-plugin-utilizes', () => root => {
  root.walkDecls('utilizes', decl => {
    decl.value.split(' ').map(utilitySelector => utilitySelector.trim()).forEach(utilitySelector => {
      root.walkRules(new RegExp(`\.${escapeStringRegexp(utilitySelector)}`), utilityRule => {
        utilityRule.walkDecls(utilityDecl => decl.parent.insertAfter(decl, utilityDecl.clone()))
      })
    })

    decl.remove()
  })
})
