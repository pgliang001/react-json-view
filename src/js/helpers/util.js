// returns a string "type" of input object
export function toType (obj, bigNumber) {

  /* Check if the object is an instance of the custom BigNumber class passed in as a prop
   * If it matches, return 'bigNumber' type so it can be displayed appropriately
   */
  if (bigNumber && obj?.constructor === bigNumber) {
    return 'bigNumber'
  }
  let type = getType(obj)
  // some extra disambiguation for numbers
  if (type === 'number') {
    if (isNaN(obj)) {
      type = 'nan'
    } else if ((obj | 0) != obj) {
      // bitwise OR produces integers
      type = 'float'
    } else {
      type = 'integer'
    }
  }
  return type
}

// source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
function getType (obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

export function escapeString (value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r')
    .replace(/\f/g, '\\f')
}

// validation for base-16 themes
export function isTheme (theme) {
  const theme_keys = [
    'base00',
    'base01',
    'base02',
    'base03',
    'base04',
    'base05',
    'base06',
    'base07',
    'base08',
    'base09',
    'base0A',
    'base0B',
    'base0C',
    'base0D',
    'base0E',
    'base0F'
  ]
  if (toType(theme) === 'object') {
    for (let i = 0; i < theme_keys.length; i++) {
      if (!(theme_keys[i] in theme)) {
        return false
      }
    }
    return true
  }
  return false
}
