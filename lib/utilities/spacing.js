const postcss = require('postcss')
const { generateUtilityRuleForProps } = require('../helpers')

module.exports = postcss.plugin('isotope-utilities-spacing', (opts = {}) => root => {  
  const responsiveRule = postcss.atRule({ name: 'responsive' })

  const rules = [].concat(
    ...['margin', 'padding'].map(type =>
      [].concat(...Object.entries(Object.assign({}, opts.values, { none: 0 }, type === 'margin' ? { auto: 'auto' } : {})).map(([name, value]) => [
          generateUtilityRuleForProps(type, name, value)
        ].concat(['top', 'bottom', 'left', 'right', ['horizontal', [{ prop: `${type}-left`, value }, { prop: `${type}-right`, value }]], ['vertical', [{ prop: `${type}-top`, value }, { prop: `${type}-bottom`, value }]]].map(dir =>
          generateUtilityRuleForProps(`${type}-${Array.isArray(dir) ? dir[0] : dir}`, name, Array.isArray(dir) ? dir[1] : value)
        ))
      ))
    )
  )

  responsiveRule.append(rules)
  root.append(responsiveRule)
})
