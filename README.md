# Tmall_Tickets
天猫超市茅台抢票功能

# 抢票方法
1.为了方便和简化抢票业务逻辑，提高代码的效率，本抢票软件只负责提交抢票和发起付款请求。<br/>
2.通过手机端将天猫超市端的茅台加入购物车，然后执行下面的操作<br/>


# 打开页面
https://cart.tmall.com/cart.htm

# Chrome浏览器加载插件运行
插件自动运行后，时间到了后，看看是否订单里面有付款项，有的话就说抢票成功，没有则是没中。

# 启动
可以通过如下命令触发开始抢购
document.getElementById("J_Cart").setAttribute("start", "go")
设置提前抢购时间（毫秒单位）
document.getElementById("J_Cart").setAttribute("jumpstart", "1000")

需要修改如下参数进行最优提前时间的判定，看运气
var jumpstart = document.getElementById("J_Cart").getAttribute("jumpstart") || 500;

