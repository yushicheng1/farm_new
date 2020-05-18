//暂时未开放功能
function NoOpenMethod(){
	mui.toast("该功能暂未开放...");
}
//获取索引
function getIndex(el) {
	var child = el.parentNode.children;
	for(var i = 0; i < child.length; i++) {
		if(el == child[i])
			return i;
	}
}

function reloadWvLoad() {
	var errorText = document.createElement('div');
	errorText.innerHTML = '<h4>网络不给力，请检查网络！</h4><button id="reloadWv" class="mui-btn mui-btn-blue">重新加载</button>';
	errorText.setAttribute('class', 'empty-show');
	document.body.appendChild(errorText);
}