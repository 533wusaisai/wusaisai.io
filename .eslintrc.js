module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended', // 添加这一行
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 在这里添加自定义规则
  },
};
