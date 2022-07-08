module.export = { 
    'env': {
        'browser': true,
        'es6': true
    },
    'parserOptions': {
        'ecmaVersion': 2017
    },
    'extends': 'eslint:recommended',
    'parser': '@babel/eslint-parser',
    'rules': {
        'quotes': ['error', 'single']
    }
}

