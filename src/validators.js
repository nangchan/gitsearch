// used with final-form to enforce multiple validation rules
export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)

// numerical validation
export const required = message => value => value ? undefined : message || 'Required'
export const minLength = (min, message) => value => (typeof(value) === 'undefined' || value.length >= min) ? undefined : message || `Should be at least ${min}`
export const mustBeNumber = message => value => (typeof(value) === 'undefined' || !isNaN(value)) ? undefined : message || 'Must be a number'

// regular expression validation
export const pattern = (pattern, message) => value => (typeof(value) === 'undefined' || value === null || value.match(pattern)) ? undefined : message || 'Does not match expected pattern'