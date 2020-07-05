module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      exclude: /(node_module)/,
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      minPixelValue: 1 // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    }
  }
}