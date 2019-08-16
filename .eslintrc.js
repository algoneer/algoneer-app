module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "settings": {
        "react": {
            "version": "detect",
        },
    },
    "rules": {
        "eqeqeq": "error",
        "indent": ["error", 4, {"SwitchCase": 1}],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"],
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "no-confusing-arrow": "error",
        "no-trailing-spaces": "error",
        "no-var": "error",
        "prefer-const": "error",
        "yoda": "error",
        "jsx-quotes": ["error", "prefer-double"],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": "warn", // to become an error
        "react/default-props-match-prop-types": "error",
        "react/forbid-foreign-prop-types": "error",
        "react/no-unused-prop-types": "error",
        "react/sort-prop-types": ["error", {"callbacksLast": true}],
        "react/no-string-refs": "warn", // to become an error
        "comma-dangle": ["error", "always-multiline"],
        "eol-last": ["error", "always"],
    },
};
