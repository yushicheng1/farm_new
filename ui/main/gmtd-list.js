"use strict";
var aUi = aUi || {};
aUi.dp = {
	_dp: function(data) {
		var html = '<li style="width: 100%; " data-id="'+data.id+'"  data-price="'+data.price+'">' +
					'<div class="li-wxz">'+
						'<div class="wxz-left" style=" width: 50%;display: inline-block; margin: 0;">'+
							'<img src="../../images/qietu/wg.png" style="float: left; width: 15%; height: 50%; margin-left: 5%; margin-top: 15%;">'+
							'<p style="font-size: 20px;margin-top: 10%;"><span style="margin-left: 10px;">'+data.name+'</span></p>'+
							'<p style="font-size: 15px;  color: #757474;margin-top: 5%;margin-left: 20%; "><span>有效期</span><span>'+data.month+'</span><span>个月</span></p>'+
						'</div>'+
						'<div style="float:right;width: 45%; height:60px;" class="wxz-right">'+
							'<img src="../../images/qietu/rx.png" style="width: 50%;height:100%;float: right; ">'+
							'<p style="margin-top: 10%;"><span style="color: #0ad397; font-size: 20px; ">'+parseInt(data.price)+'</span><span'+
							'	 style="font-size: 15px;"></span></p>'+
							'<p style="font-size: 15px;color: #757474;"><span>'+parseInt(data.square)+'</span><span>m²</span></p>'+
						'</div>'+
					'</div>'+
				'</li>';
		return html;
	},
	dpList: function(list4Dp) {
		var html = "";
		for(var i = 0; i < list4Dp.length; i++) {
			html += this._dp(list4Dp[i]);
		}
		return html;
	}
}