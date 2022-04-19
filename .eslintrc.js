// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        'arrow-parens': ['error', 'as-needed'],
        camelcase: 'off',
        'comma-dangle': 'error',
        complexity: 'off',
        'constructor-super': 'error',
        'dot-notation': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'off',
        'id-blacklist': 'off',
        'id-match': 'off',
        indent: ["error", 4],
        'import/order': 'off',
        'max-classes-per-file': 'off',
        'max-len': 'off',
        'new-parens': 'error',
        'no-bitwise': 'off',
        'no-caller': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-eval': 'error',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-arrow/prefer-arrow-functions': 'off',
        'prefer-const': [
            'error',
            {
                destructuring: 'all'
            }
        ],
        'quote-props': ['error', 'as-needed'],
        radix: 'off',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'spaced-comment': ['off', 'never'],
        'use-isnan': 'error',
        'valid-typeof': 'off'
    }
};