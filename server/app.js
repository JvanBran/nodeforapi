const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const convert = require('koa-convert')
const json = require('koa-json')
const koajwt = require('koa-jwt')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const loggers = require('./middleware/loggers')

const router = require('./routes/index')

const db = require('./config/dbConfig')

// error handler
onerror(app)

app.use(convert.compose(
  bodyparser({enableTypes:['json', 'form', 'text']}),
  json(),
  logger(),
))

// middlewares
app.use(convert(require('koa-static')(__dirname + '/public')));

// 本地log
app.use(convert(loggers()));



app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(koajwt({
  secret: 'test_token'
}).unless({
  path: [/^\/login/]
}));

// routes
app.use(router.routes(), router.allowedMethods());


// mongodb connect
db.connect();


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
