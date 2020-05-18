// mui.init();
// mui('.mui-scroll-wrapper').scroll({
// 	bounce: false,
// 	indicators: false, //是否显示滚动条
// 	deceleration: mui.os.ios ? 0.003 : 0.0009 //阻尼系数
// });
if (mui.os.plus) {
	setTimeout(function() {
		mui.plusReady(aFunc.plusReady);
	}, 300);
} else {
	mui.ready(aFunc.plusReady);
}
function har() {
	setTimeout(function() {
		alert('暂时没有直播')
	}, 500);
}




function fertilizer(){
	document.getElementById('ck').style.visibility= "visible";
}

function exit(){
	document.getElementById('ck').style.visibility= "hidden";
}
function img(){
	document.getElementById('lan').style.visibility= "visible";
}
function a(){
	document.getElementById('lan').style.visibility= "hidden";
}
function fert(){
	document.getElementById('img').style.visibility= "hidden";
}
function chanc(){
	document.getElementById('lan').style.visibility= "hidden";
	document.getElementById('img').style.visibility= "hidden";
}
function zz(){
	document.getElementById('img').style.visibility= "hidden";
	document.getElementById('lan').style.visibility= "hidden";
	document.getElementById('ck').style.visibility= "visible";
}
function li(){
	document.getElementById("lises").style.visibility="hidden"
}
function lise(){
	document.getElementById("lises").style.visibility="visible"
}
// function jc(){
// 	setTimeout(function() {
// 		document.getElementById("hl").style.visibility="visible"
// 	}, 500);
// 	document.getElementById("jc").style.visibility="hidden"
	
// }
// function hl(){
// 		document.getElementById("lanz").style.visibility="visible"
// }
// function guanb(){
// 	document.getElementById("lanz").style.visibility="hidden"
// }
// function zhuanhua(){
// 	document.getElementById("lanz").style.visibility="hidden"
// 	document.getElementById("hl").style.visibility="hidden"
// 	document.getElementById("jc").style.visibility="visible"
// }








