
//未开始时这个length非0
//document.getElementsByClassName("tb-btn-wait").length
//开始之后这个length为0
//document.getElementsByClassName("tb-btn-wait").length
//开始之后出现J_LinkBuy元素
//document.getElementById("J_LinkBuy")
// <a id="J_LinkBuy" href="#" rel="nofollow" data-addfastbuy="true" title="点击此按钮，到下一步确认购买信息。" role="button">立即购买<span
// 	className="ensureText">确认</span></a>
//var btn = document.querySelector("#J_LinkBuy");
//btn.click()
/**
 *
 *
 *
 */


//定时器
var timer = null;

//检测状态
function checkElementState(path,callback){
	var ele = document.querySelector(path);
	if(ele){
		callback && callback();
	}else{
		console.log('异步加载元素中....' + path );
		setTimeout( function(){checkElementState(path,callback);},10);
	}
}



//点击购买按钮
function clickBuy(){
	
	console.log('买！');
	
	//票的数量  如果还不可以购买，这个地方获取会失败 
	var amount = document.getElementsByClassName('mui-amount-increase')[0];
	amount && amount.click();  //+1
	
	var btnBuy = document.querySelector('');
	
}


//结算
function checkOut(){
	var checkOutDate = new Date();
	var checkOutDateNumber = checkOutDate.getTime();
	//ref: https://developer.chrome.com/docs/extensions/reference/storage/
	chrome.storage.local.set({"checkOutDateNumber": checkOutDateNumber}, function() {
		console.log('checkOutDateNumber is set to ' + checkOutDateNumber);
	});
	console.log('结算开始....');
	var btn = document.getElementById('J_Go');

	if(btn){
		btn.click();
	}else{
		console.log('结算按钮没找到');
	}
	
}

function checkOutAsync(){
	checkElementState('#J_Go',checkOut);
}

//提交订单
function submitOrder(){
	chrome.storage.local.get(['checkOutDateNumber'], function(result) {
		console.log("checkOutDateNumber is:", result);
		// storage_data = result
		/**
		 * 如下获取是undefined，还没研究为什么拿不出来，先手动计算result打印结果和submitOrderDateNumber的差值
		 */
		// console.log("storage get result key:", result.key);
		// console.log("storage get result value:", result.value);
		// console.log('jumpstart time should be' + submitOrderDateNumber-result.value);
	});

	var submitOrderDate = new Date();
	var submitOrderDateNumber = submitOrderDate.getTime();
	console.log('submitOrderDateNumber:', submitOrderDateNumber);
	console.log('提交订单开始....');
	checkElementState('.go-btn',function(){
		var btn = document.querySelector(".go-btn");

		if(btn){
			btn.click();
		}else{
			console.log('提交订单按钮没找到');
		}

	});


}



//目标时间
	var dDate = new Date();  //10点和20点开抢
	if( dDate.getHours() < 10 ){
		dDate.setHours(10,0,0);
	}else{
		dDate.setHours(20,0,0);
		// /**
		//  * 修改为23测试使用
		//  */
		// dDate.setHours(23,0,0);
	}
	
	//dDate.setSeconds( dDate.getSeconds() + 10 );
	
//进入时间判断循环
function enterTimeCheckLoop(callback) {
	var date = new Date();
	/**
	 * 一种tricky的方式设置start，触发进行抢购
	 * document.getElementById("J_Cart").setAttribute("start", "go")
	 */
	var start = document.getElementById("J_Cart").getAttribute("start") || "";

	var jumpstart = document.getElementById("J_Cart").getAttribute("jumpstart") || 500;

	if (start != "") {
		console.log('start=', start);
	}

	var diff = dDate.getTime() - date.getTime() ;
	
	console.log(diff);
	
	if(diff < - 900 ){
		console.log('时间过了！diff:', diff);
	}else if(diff < jumpstart || start === "go" ) {
		console.log('start timestamp:', date);
		callback && callback();
		
		console.log('时间到了！！！');
		
	}else{
		setTimeout(function(){ enterTimeCheckLoop(callback);},400);
		
		//console.log('--');
	}
	
	
	
}


//主要函数
function main(){
	console.log('############################开始抢购茅台############################');
	
	//debugger;
	
	var href = window.location.href;
	if(href.indexOf('cart.tmall.com') > -1 ){
		//结算页面
		
		//进入时间判断
		enterTimeCheckLoop( checkOutAsync );
	
	
	}else if(href.indexOf('buy.tmall.com') > -1 ){
		//提交订单页面
		
		submitOrder();
	}
	
}


main();