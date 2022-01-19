module.exports = {
  // preset: "babel-preset-jest",
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
  testEnvironment: 'jsdom',
  testMatch:[
    "**/?(*.)+(spec|test|unit).[j]s?(x)" // 匹配测试文件
  ],
  transform: {
    "^.+\.[j|t]sx?$": "babel-jest",
    "^.+\.vue?$": "vue3-jest"
  }
}