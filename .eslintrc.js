module.exports = {
    env: {
        'node': true,
        "jest/globals": true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript'
    ],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn'
    },
    plugins: ['jest']
}