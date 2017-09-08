const escapeStringRegexp = require('escape-string-regexp')
const postcss = require('postcss')

const generateSelectorRegExp = selector => {
  const [className, state] = selector.split(':')

  return new RegExp(`^(${escapeStringRegexp(className.indexOf('.') === 0 ? className.substr(1) : className )})${state ? `(?:\\:(${escapeStringRegexp(state)}))*` : ''}$`)
}

/**
 * Usage:
 *
 * .utility-selector {
 *   color: black;
 * }
 *
 * .component {
 *   utilizes: utility-selector;
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
module.exports = postcss.plugin('isotope-plugin-utilizes', () => (root, result) => {
  root.walkDecls('utilizes', decl => {
    decl.value.split(' ').map(utilitySelector => utilitySelector.trim()).forEach(utilitySelector => {
      let found = false

      root.walkRules(new RegExp(`\\.${utilitySelector}`), utilityRule => {
        if (!utilityRule.selectors.find(selector => generateSelectorRegExp(selector).test(utilitySelector))) {
          return
        }

        utilityRule.walkDecls(utilityDecl => decl.parent.insertAfter(decl, utilityDecl.clone()))
        found = true
      })

      if (!found) {
        decl.warn(result, `Trying to utilize ".${utilitySelector}" on "${decl.parent.selector}", but the utility class cannot be found`)
      }
    })

    decl.remove()
  })
})
