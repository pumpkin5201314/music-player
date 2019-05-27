var gulp = require("gulp");
//4个API:gulp.src  ,gulp.dest  ,gulp.task   ,gulp.watch
//压缩html
//gulp中插件的应用   下载插件---》取到插件---》应用插件
//压缩html
 var htmlClean=require("gulp-htmlclean");
//压缩图片
var imageMin=require("gulp-imagemin");
//压缩js插件
var uglify=require("gulp-uglify");
//去掉js中的调试语句
var debug=require("gulp-strip-debug");
//将less转换成css
var less=require("gulp-less");
//压缩css
var cleanCss=require("gulp-clean-css");

//给css3添加前缀 两个插件  postcss   <---参数----autoprofixer

var postCss=require("gulp-postcss");
var autoprefixer=require("autoprefixer"); 
//开启服务器
var connect=require("gulp-connect");


var folder={
	src:'src/',
	dist:'dist/'
}
 //先 命令行中设置环境变量  export NODE_ENV=development  --开发环境
//判断当前环境变量
var devMod = process.env.NODE_ENV=="development" ;

 console.log(devMod);


gulp.task("server",function(){

	connect.server({
		port:9988,
		livereload:true//监听文件变化--->自动刷新页面
	})

})

//监听文件变化   2.下次文件变化时-->执行html,css,js
gulp.task("watch",function(){

	gulp.watch(folder.src + "html/*",["html"]);
	gulp.watch(folder.src + "css/*",["css"]);
	gulp.watch(folder.src + "js/*",["js"]);
		 
})


gulp.task("image",function(){
	gulp.src(folder.src+"images/*")
		.pipe(connect.reload())//自动刷新页面
		.pipe(imageMin())
		.pipe(gulp.dest(folder.dist+"images/"))
})



gulp.task("html",function(){
	var page = gulp.src(folder.src+"html/*")
		.pipe(connect.reload())//自动刷新页面
		if(!devMod){
			page.pipe(htmlClean())
		}
		 
		page.pipe(gulp.dest(folder.dist+"html/"))
})

gulp.task("css",function(){
	var page =	gulp.src(folder.src+"css/*")
		.pipe(connect.reload())//自动刷新页面
		.pipe(less())
		.pipe(postCss([autoprefixer()]))
		if(!devMod){
			page.pipe(cleanCss())
		}
		 
		page.pipe(gulp.dest(folder.dist+"css/"))
})
gulp.task("js",function(){
	var page = gulp.src(folder.src+"js/*")
		.pipe(connect.reload())//自动刷新页面
		if(!devMod){
			page.pipe(debug())
				.pipe(uglify())
		}
	 
		page.pipe(gulp.dest(folder.dist+"js/"))
})


gulp.task('default',["html","css","js","image","server","watch"]);//1.gulp时会执行watch


