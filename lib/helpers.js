const camelcase = require('camelcase')
const postcss = require('postcss')

exports.generateUtilityRuleForProp = (prop, name, value) => {
  const rule = postcss.rule({ selector: `.${camelcase(prop)}-${camelcase(name)}`,  })
  rule.append({ prop, value })

  return rule
}
