module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'no-unused-vars': 0,
    'consistent-return': 0,
    'no-restricted-globals': 0,
    'import/extensions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'array-callback-return': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/prop-types': 0,
    'no-undef': 0,
    'react/require-default-props': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 0,
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'draft',
          'config',
          'registration',
          'props',
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'react/display-name': 0,
  },
};
