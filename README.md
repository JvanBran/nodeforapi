# 基于NODE的接口项目

## 前端

>> ant-design-vue 、 axios 、vuex-persistedstate 、 Vue全家桶

* ant-design-vue 中台UI组件
* axios 请求及其封装
* vuex-persistedstate Vuex持久化

## 后端

>> datalize 、 jsonwebtoken 、koa-jwt、log4js、mongoose、mongoose-double、qiniu 、nodemon

* datalize 表单参数校验，中间件统一返回错误
* jsonwebtoken、koa-jwt JWT鉴权，中间件统一返回错误
* mongoose 操作mongodb
* qiniu 获取凭证上传
* nodemon Node更更新

## 说明
项目遵循MVC设计模式、并没有使用koa-view直接服务端渲染。在这些年中一直认可和遵从的便是面向接口开发，因此此项目完全遵循前后端分离。如果使用NGINX完整实现负载均衡，使用DOCKER分发。(这些都没有实现，后续考虑实现)
