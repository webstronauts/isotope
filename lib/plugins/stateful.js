const postcss = require('postcss');

/**
 * Usage:
 * 
 * @stateful {
 *   .utility-selector {
 *     color: black;
 *   }
 * }
 * 
 * Output:
 * 
 * .utility-selector,
 * .utility-selector-hover:hover,
 * .utility-selector-focus:focus {
 *   color: black;
 * }
 */
module.exports = postcss.plugin('isotope-stateful-rule', (opts = {}) => root => {  
  root.walkAtRules('stateful', atRule => {
    let states = opts.states

    let params
    if (params = /^\(([^\)]+)\)$/.exec(atRule.params)) {
      states = params[1].split(',').map(state => state.trim())
    }

    atRule.walkRules(rule => {
      if (!/^\./.test(rule.selector)) {
        // We only support class-based selectors
        return
      }

      const originSelector = rule.selector

      states.forEach(state => {
        rule.selectors = rule.selectors.concat([`${originSelector}--${state}:${state}`])
      })
    })

    atRule.parent.insertAfter(atRule.parent, atRule.nodes)
    atRule.remove()
  })
})
