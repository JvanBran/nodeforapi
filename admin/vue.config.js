const vueConfig = {
    devServer: {
        // development server port 8080
        port: 8080,
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        proxy: {
            '/api': {
                // target: 'http://192.168.8.243:18080',  // 接口域名,
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,  //是否跨域
                ws:true,
                pathRewrite: {
                    '^/api': ''   //需要rewrite重写的,
                }
            },
        }
    },
}
module.exports = vueConfig