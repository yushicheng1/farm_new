"use strict";
var aUi = aUi || {};
aUi.bank = {
	_bank: function(data) {
		var html = '<li class="mui-table-view-cell mui-media" style="height: 150px;background-image: url(../../images/tixian/bgm_1.png);background-size: 100% 100%;">'+
						'<div style="height: 60%;padding-top: 7%;">'+
							'<p style="color: white;font-size: 25px;">中国银行</p>'+
						'</div>'+
						'<div style="height: 40%;">'+
							'<p style="color: white;font-size: 23px;text-align: center;">622357******4561237</p>'+
						'</div>'+
					'</li>';
		return html;
	},
	bankList: function(list4Bank) {
		var html = "";
		for (var i = 0; i < list4Bank.length; i++) {
			html += this._bank(list4Bank[i]);
		}
		return html;
	}
}
