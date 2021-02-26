"use strict";
var aUi = aUi || {};
aUi.bank = {
	_bank: function(data) {
		if (data.status == 2) {
			var html =
				'<li class="mui-table-view-cell mui-media" style="height: 150px;background-image: url(../../images/tixian/bgm_1.png);background-size: 100% 100%;" data-id="' +
				data.id + '">' +
				'<p style="float: right;color: #000000;">默认银行卡</p>' +
				'<div style="height: 60%;padding-top: 7%;">' +
				'<p style="color: white;font-size: 25px;">' + data.bankname + '</p>' +
				'</div>' +
				'<div style="height: 40%;">' +
				'<p style="color: white;font-size: 23px;text-align: center;letter-spacing: 1.5px;">' + data.cardnumber + '</p>' +
				'</div>' +
				'</li>';
		} else {
			var html =
				'<li class="mui-table-view-cell mui-media" style="height: 150px;background-image: url(../../images/tixian/bgm_1.png);background-size: 100% 100%;" data-id="' +
				data.id + '">' +
				'<div style="height: 60%;padding-top: 7%;">' +
				'<p style="color: white;font-size: 25px;">' + data.bankname + '</p>' +
				'</div>' +
				'<div style="height: 40%;">' +
				'<p style="color: white;font-size: 23px;text-align: center;letter-spacing: 1.5px;">' + data.cardnumber + '</p>' +
				'</div>' +
				'</li>';
		}
		return html;
	},
	bankList: function(list4Bank) {
		var html = "";
		for (var i = 0; i < list4Bank.length; i++) {
			html += this._bank(list4Bank[i]);
		}
		return html;
	},

	_bankOne: function(data) {

		var html = '<li class="mui-table-view-cell" style="color: #000000;" data-type="3" data-phone="' + data.phone +
			'" data-cardId="' + data.id + '" data-no="' + data.cardnumber + '" data-name="' + data.bankname + '">' +
			'<a class="mui-navigate-right">' + data.bankname + '(' + data.cardnumber.substring(data.cardnumber.length - 4) +
			')' + '<span style="color:red;margin-left:10px">(推荐)</span></a>' +
			'</li>';
		return html;
	},
	bankOneList: function(list4Bank, money, rules) {
		var html = '';
		var html1 = '<li class="mui-table-view-cell" data-type="4" style="color: #000000;" >' +
			'<a class="mui-navigate-right">余额<span style="color: red;">(' + money +
			')(试运行)</a>' +
			'</li>';

		var html2 = '<li class="mui-table-view-cell" data-type="1" style="color: #000000;" >' +
			'<a class="mui-navigate-right">支付宝<span style="color: red;"></span></a>' +
			'</li>';
		var html3 = '<li class="mui-table-view-cell " data-type="2" style="color: #000000;" >' +
			'<a class="mui-navigate-right">微信<span style="color: red;"></a>' +
			'</li>';
		var html4 = '<li class="mui-table-view-cell " data-type="5" style="color: #000000;" >' +
			'<a class="mui-navigate-right">ABC<span style="color: red;"></a>' +
			'</li>';
		// if(rules.realmoney_open==1){
		html += html1;
		// }
		// if(rules.bank_open==1){
		for (var i = 0; i < list4Bank.length; i++) {
			html += this._bankOne(list4Bank[i]);
		}
		// }
		// if(rules.wechat_open==1){
		html += html3;
		// }
		// if(rules.alipay_open==1){
		html += html2;
		html += html4;
		// }

		return html;
	},
	_bankTwo: function(data) {
		var html = '<li class="mui-table-view-cell" style="color: #000000;" data-type="3" data-phone="' + data.phone +
			'" data-cardId="' + data.id + '" data-no="' + data.cardnumber + '" data-name="' + data.bankname + '">' +
			'<a class="mui-navigate-right">' + data.bankname + '(' + data.cardnumber.substring(data.cardnumber.length - 4) +
			')' + '</a>' +
			'</li>';
		return html;
	},
	bankTwoList: function(list4Bank) {
		var html = '';
		for (var i = 0; i < list4Bank.length; i++) {
			html += this._bankTwo(list4Bank[i]);
		}
		return html;
	}
}
