const path=require("path");
const htmlPlugin=require("html-webpack-plugin");
const extractTextPlugin=require("extract-text-webpack-plugin");


var website={
    publicPath:"http://localhost/"
}

module.exports={
    entry:{
        entry:'./src/entry.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist/'),
        filename:'./bundle.js',
        publicPath:website.publicPath
    },
    module:{
        rules:[
            {// es6编译成es5
                test:/\.js$/,
                use:[
                    {
                        loader:"babel-loader"
                    }
                ]
            },
            {//css分离与打包 
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {//图片分离与打包
                test:/\.(png|jpg|gif)/ ,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:5000,
                        outputPath:'images/',
                    }
                }]
            }
        ]
    },
    plugins:[
        new htmlPlugin({//打包html文件
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin('./css/index.css')
    ],
    devServer:{
        contentBase:path.resolve(__dirname,"./dist"),
        port:1717,
        compress:true,
        host:"localhost"
    }
}