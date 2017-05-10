var path = require('path');
// 开发环境配置文件
module.exports = {
    port: 3000, //监听的端口，暂时未用
    name: 'DJTU大学生论坛',
    description: '大连交通大学的专属论坛',
    // 关于express-session的配置
    session: {
        secret: 'demo-cnode',
        key: 'demo-cnode',
        maxAge: 2592000000
    },
    // 数据库连接地址
    mongodb: 'mongodb://localhost:27017/demo-cnode-test',

    // multer中间件配置
    multerStorageOpts: {
        //保存头像的路径
        destination: path.join(__dirname, '../public/img'),
        // 设置保存时的文件名
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    },
    // 开启debug
    debug: true
};