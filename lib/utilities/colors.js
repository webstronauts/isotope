const postcss = require('postcss')
const { generateUtilityRuleForProps } = require('../helpers')

module.exports = postcss.plugin('isotope-utilities-colors', (opts = {}) => root => {  
  const responsiveRule = postcss.atRule({ name: 'responsive' })
  const statefulRule = postcss.atRule({ name: 'stateful' })

  const rules = [].concat(
    ...['color', 'background-color', 'border-color', 'fill'].map(
      prop => Object.entries(Object.assign({}, opts.values, { inherit: 'inherit' }))
        .map(([color, value]) => generateUtilityRuleForProps(prop, color, value))
    )
  )

  statefulRule.append(rules)
  responsiveRule.append(statefulRule)
  root.append(responsiveRule)
})
