"use strict";
var aUi = aUi || {};
aUi.seed = {
	_seed: function(data) {
		var html = '<li data-id="' + data.id + '" data-name="'+data.name+'"  class="mui-table-view-cell mui-media">'+
						'<div>'+
							'<img class="mui-media-object mui-pull-left" src="../../images/homemenu/xhs.jpg" style="max-width: 80px;height: 80px;border-radius: 10px;">'+
							'<div class="mui-media-body">'+
								'<p><span style="color: green;font-size: 20px;"><b>'+ data.name+'</b></span></p>'+
								'<p style="color: black;font-size: 15px;margin-top: 8px;"><span>销量:</span><span>'+ data.sales+'</span>'+
									'<p style="color: #FF5053;font-size: 17px;margin-top: 8px;"><span>价格:</span><span>'+data.price+'</span><span>元</span></p>'+
							'</div>'+
						'</div>'+
					'</li>'
		return html;
	},
	seedList: function(list4Seed) {
		var html = "";
		for(var i = 0; i < list4Seed.length; i++) {
			html += this._seed(list4Seed[i]);
		}
		return html;
	}
}