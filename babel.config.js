module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import', 
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
        // 指定样式路径（由于修改内置主题样式）
        style: (name) => `${name}/style/less`,
      }, 
      'vant',
    ]
  ],
}
