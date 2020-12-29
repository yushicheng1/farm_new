"use strict";
var aUi = aUi || {};
aUi.wallet = {
	_wallet: function(data) {
		var html='';
		if(data.level%2 ==1){
			if(data.level==1){
				html= '<li class="li-xz" style="float: left;margin-left: 17%;" data-price="'+data.money+'" data-level="'+data.level+'">'+
									'<div class="mui-media-body" style="display: flex;align-items: center;justify-content: center;height: 160px;">'+
										'<p><span style="color: #eb7b76;font-size: 25px;">'+data.money+'</span><span style="color: #eb7b76;font-size: 12px;"></span></p>'+
									'</div>'+
									'<div>'+
										'<p style="text-align: center;position: relative;bottom: 40px;"><span>￥'+data.money+'</span></p>'+
									'</div>'+
								'</li>';
			}else{
				html='<li class="li-wxz" style="float: left;margin-left: 17%;" data-price="'+data.money+'" data-level="'+data.level+'">'+
					'<div class="mui-media-body" style="display: flex;align-items: center;justify-content: center;height: 160px;">'+
						'<p style="text-align: center;"><span style="color: #eb7b76;font-size: 25px;">'+data.money+'</span><br><span style="color: #eb7b76;font-size: 12px;">首充+'+data.gift+'</span></p>'+
					'</div>'+
					'<div>'+
						'<p style="text-align: center;position: relative;bottom: 40px;"><span>￥'+data.money+'</span></p>'+
					'</div>'+
				'</li>';
			}			
		}else{
			html='<li class="li-wxz" style="float: left;" data-price="'+data.money+'" data-level="'+data.level+'">'+
				'<div class="mui-media-body" style="display: flex;align-items: center;justify-content: center;height: 160px;">'+
					'<p style="text-align: center;"><span style="color: #eb7b76;font-size: 25px;">'+data.money+'</span><br><span style="color: #eb7b76;font-size: 12px;">首充+'+data.gift+'</span></p>'+
				'</div>'+
				'<div>'+
					'<p style="text-align: center;position: relative;bottom: 40px;"><span>￥'+data.money+'</span></p>'+
				'</div>'+
			'</li>';
		}
		 
		return html;
	},
	walletList: function(list4Record) {
		var html = "";
		for(var i = 0; i < list4Record.length; i++) {
			html += this._wallet(list4Record[i]);
		}
		return html;
	}
}