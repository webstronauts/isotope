const camelcase = require('camelcase')
const postcss = require('postcss')

exports.generateUtilityRuleForProps = (prop, name, value) => {
  const rule = postcss.rule({ selector: `.${camelcase(prop)}-${camelcase(name)}` })
  rule.append.apply(rule, Array.isArray(value) ? value : [{ prop, value }])

  return rule
}
