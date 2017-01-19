const camelCase = require('camelcase')
const titleize = require('titleize')
const types = require('node-sass').types

module.exports = {
  'camelize($string)': string => (
    new types.String(camelCase(string.getValue()))
  ),
  'titleize($string)': string => (
    new types.String(titleize(string.getValue()))
  )
}
