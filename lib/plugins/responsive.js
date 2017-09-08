const postcss = require('postcss');

/**
 * Usage:
 * 
 * @responsive {
 *   .utility-selector {
 *     width: 50%;
 *   }
 * }
 * 
 * Output:
 * 
 * .utility-selector {
 *   width: 50%;
 * }
 * 
 * @media (min-width: 32rem) {
 *   .md\:utility-selector {
 *     width: 50%;
 *   }
 * }
 */
module.exports = postcss.plugin('isotope-plugin-responsive', (opts = {}) => root => {
  const breakpoints = Object.keys(opts.breakpoints).reduce((breakpoints, breakpoint) => Object.assign(breakpoints, { [breakpoint]: [] }), {})

  root.walkAtRules('responsive', atRule => {
    atRule.walkRules(rule => {
      if (!/^\./.test(rule.selector)) {
        // We only support class-based selectors
        return
      }

      Object.values(breakpoints).forEach(rules => {
        rules.push(rule.clone());
      })
    })

    atRule.parent.insertAfter(atRule.parent, atRule.nodes)
    atRule.remove()
  })

  Object.entries(breakpoints).forEach(([breakpoint, rules]) => {
    const atRule = postcss.atRule({ name: 'media', params: `(min-width: ${opts.breakpoints[breakpoint]})` })

    atRule.append(rules.map(rule => {
      rule.selectors = rule.selectors.map(selector => `.${breakpoint}\\:${selector.substr(1)}`)
      return rule
    }))

    root.append(atRule)
  })
})
