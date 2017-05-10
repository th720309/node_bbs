# demo-cnode
模仿cnode社区的一个demo，可直接访问[demo-cnode](http://cnode.cyrilszq.cn/)体验。项目整体结构模仿的是[原版cnode社区](https://github.com/cnodejs/nodeclub/)，一些设计可能没那么好，第一次写后端对后端业务逻辑不是很熟悉，有些没有思路的直接参照原版的。其中测试只编写了注册登录整个流程,个人页做的比较简陋。

## 已有的功能
- 响应式布局
- 注册登录登出
- 发布话题，编辑话题
- 评论功能（不完善）
- 话题分类
- 话题添加收藏
- 积分排名（不完善）
- 简单的xss,csrf防御（中间件，没有详细配置）

## 用到的技术
express+ejs+mongoose+一大堆中间件

## License
MIT



