# view-photo

- 基于 element-ui 开发的预览图片组件
- 支持 放大、缩小、复原、下载、打印等功能
- 支持在线预览pdf、word等文档
- 暂时只支持jpg、png格式的图片

# 安装使用说明

```
npm i viewPhoto
```
# api

## 属性

| 属性值 |  类型 | 描述
| --- | --- | ---
| imgData | string | 图片地址(url)
| imgName | string | 图片名称
| ··· | ··· | ···

## 事件
| 事件名 |  说明 | 回调参数
| --- | --- | ---
| publish | 打印后的回调 | 打印的内容
| ··· | ··· | ···

# 示例

## 调用方法打开 如果你只需简单使用

```
this.$VDPhoto.show({
    imgData: "url",
    imgName: '图片名'
});

```

## 组件形式打开 如果你需要额外功能
```
<viewPhoto 
    ref="viewPhoto"
    :imgData='imgData'
    :imgName='imgName'
    @publish='publish'
    ....
/>

```

# 最后

- 如果对你有帮助，请star一个哦，你的鼓励是我创作的动力
- 欢迎来到我的博客，希望能对你有所帮助
- 掘金：https://juejin.cn/user/2339399368751325/posts
- csdn：https://blog.csdn.net/weixin_44083712?spm=1010.2135.3001.5343
- csdn | 掘金 | 知乎 同名： 饼干_


